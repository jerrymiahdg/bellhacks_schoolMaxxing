from flask import Flask, jsonify, request, render_template, redirect, url_for
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
app.app_context().push()

class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(50), nullable=False)
    lastName = db.Column(db.String(50), nullable=False)
    username = db.Column(db.String(25), nullable=False, unique=True)
    password = db.Column(db.String(40), nullable=False)
    is_admin = db.Column(db.Boolean)
    is_banned = db.Column(db.Boolean)
    school_id = db.Column(db.Integer)

class Schools(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(100))
    mascot = db.Column(db.String(100))

class Posts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    category_id = db.Column(db.Integer)
    description = db.Column(db.String(500))
    title = db.Column(db.String(100), nullable=False)
    image = db.Column(db.String(500))
    link = db.Column(db.String(500))
    school_id = db.Column(db.Integer)
    user_id = db.Column(db.String(50))
    # upvotes = db.Column(db.Integer)
    # downvotes = db.Column(db.Integer)
    isFeatured = db.Column(db.Boolean)

class Categories(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500))
    school_id = db.Column(db.Integer)

class Favorites(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer)
    user_id = db.Column(db.Integer)
    school_id = db.Column(db.Integer)

@app.route('/')
def home():
    return "Hello"

@app.route('/users/createUsers', methods=['POST'])
def createUsers():
    print(request.json['username'])
    username = request.json['username']
    password = request.json['password']
    firstName = request.json['firstName']
    lastName = request.json['lastName']
    is_admin = request.json['is_admin']
    is_banned = False
    school_id = request.json['school_id']
    newUser = Users(username=username, password=password, firstName=firstName, lastName=lastName, is_admin=is_admin, is_banned=is_banned, school_id=school_id)
    db.session.add(newUser)
    db.session.commit()
    return jsonify({"id": newUser.id})

@app.route('/users/getUsers', methods=['GET'])
def getUsers():
    users = Users.query.all()
    user_list = [{'id': user.id, 'username': user.username, 'password':user.password, 'firstName':user.firstName, 'lastName':user.lastName, 'is_admin': user.is_admin, 'is_banned': user.is_banned, 'school_id': user.school_id} for user in users]
    return jsonify(user_list)

@app.route('/schools/getSchools', methods=['GET'])
def getSchools():
    schools = Schools.query.all()
    school_list = [{'id': school.id, 'name': school.name, 'location': school.location, 'mascot': school.mascot} for school in schools]
    return jsonify(school_list)

@app.route('/schools/createSchool', methods=['POST'])
def createSchool():
    name = request.json['name']
    location = request.json['location']
    mascot = request.json['mascot']
    newSchool = Schools(name=name, location=location, mascot=mascot)
    db.session.add(newSchool)
    db.session.commit()
    return jsonify({"id": newSchool.id})

@app.route('/posts/getPosts', methods=['GET'])
def getPosts():
    posts = Posts.query.all()
    post_list = [{'id': post.id, 'category_id': post.category_id, 'description': post.description, 'title': post.title, 'image': post.image, 'link': post.link, 'school_id': post.school_id, 'isFeatured': post.isFeatured} for post in posts]
    return jsonify(post_list)

@app.route('/posts/addPosts', methods=['POST'])
def addPosts():
    user_id = current_user.id
    user = Users.query.get(user_id)
    if not user.is_banned:
        category_id = request.json['category_id']
        description = request.json['description']
        title = request.json['title']
        image = request.json['image']
        link = request.json['link']
        school_id = request.json['school_id']
        user_id = request.json['user_id']
        isFeatured = False
        newPost = Posts(category_id=category_id, description=description, title=title, image=image, link=link, school_id=school_id, user_id=user_id, isFeatured=isFeatured)
        db.session.add(newPost)
        db.session.commit()
        return "Post created successfully!"      
    else:
        return "You are banned, sorry!"
    
@app.route('/posts/deletePosts', methods=['POST'])
def deletePosts(id):
    post = Posts.query.get(id)
    db.session.delete(post)
    return "Post has been removed"

@app.route('/categories/getCategories', methods=['GET'])
def getCategories():
    categories = Categories.query.all()
    category_list = [{'id': category.id, 'title': category.title, 'description': category.description, 'school_id': category.school_id} for category in categories]
    return jsonify(category_list)

@app.route('/categories/addCategory', methods=['POST'])
def addCategory():
    user_id = request.json("user_id")
    user = Users.query.get(user_id)
    if user.is_admin:
        title = request.json['title']
        description = request.json['description']
        school_id = request.json['school_id']
        newCategory = Categories(title=title, description=description, school_id=school_id)
        db.session.add(newCategory)
        db.session.commit()
        return "Category was added successfully"
    else:
        return "You can't do that!"
    
@app.route('/favorites/getFavorites', methods=['GET'])
def getFavorites():
    favorites = Favorites.query.all()
    favorites_list = [{'id': favorite.id, 'post_id': favorite.post_id, 'user_id': favorite.user_id, 'school_id': favorite.school_id} for favorite in favorites]
    return jsonify(favorites_list)
@app.route('/favorites/addFavorites', methods=['POST'])
def addFavorites():
    post_id = request.json['post_id']
    user_id = request.json['user_id']
    school_id = request.json['school_id']
    newFavorite = Favorites(post_id=post_id, user_id=user_id, school_id=school_id)
    db.session.add(newFavorite)
    db.session.commit()
    return "Favorite was successfully added!"
    
if __name__ == "__main__":
    db.create_all()
    app.run(debug=True)