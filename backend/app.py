from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = 'postgres+psycopg2://postgres:R!shabh@localhost:5432/My2Do'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
CORS(app)

class todoList(db.Model):
    __tablename__ = 'todoList'
    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String, unique=True, nullable=False)

    def __init__(self, category):
        self.category = category



@app.route('/todolist', methods=['POST'])
def post_todoList():
    data = request.get_json()
    category = data["category"]
    ts = todoList(category)
    db.session.add(ts)
    db.session.commit()
    
    return jsonify(msg="Category added"), 201


@app.route('/todolist')
def get_todoList():
    todo_list = todoList.query.all()
    todolist = []
    for ele in todo_list:
        c = {}
        c['id'] = ele.id
        c['category'] = ele.category
        todolist.append(c)
    return jsonify(tasklist=todolist)


class Task(db.Model):
    __tablename__="task"
    id = db.Column(db.Integer, primary_key=True)
    list_id = db.Column(db.Integer)
    todo = db.Column(db.String, nullable=False)
    completed = db.Column(db.Boolean)

    def __init__(self,list_id, todo, completed):
        self.list_id = list_id
        self.todo = todo
        self.completed = False
        

@app.route('/tasks')
def get_tasks():
    tasks_list_id = request.args.get('task_list')
    tasks = Task.query.filter_by(list_id = tasks_list_id)
    task_list = []
    for task in tasks:
        t={}
        t["id"] = task.id
        t["list_id"] = task.list_id
        t["todo"] = task.todo
        t["completed"] = task.completed
        task_list.append(t)
    return jsonify(task = task_list)

@app.route('/tasks', methods=['POST'])
def post_tasks():
    data = request.get_json()
    list_id = data["list_id"]
    todo = data["todo"]
    completed = False
    task = Task(list_id, todo, completed)
    db.session.add(task)
    db.session.commit()
    
    return jsonify(msg="Task added"), 201

@app.route('/tasks/<id>', methods=['PUT'])
def update_task(id):
    task = Task.query.filter_by(id = id).first()
    task.completed = not(task.completed)
    db.session.add(task)
    db.session.commit()
    return jsonify(message= "task updated ", task_id = task.id)


@app.route('/tasks/<id>', methods=['DELETE'])
def delete(id):
    task = Task.query.filter_by(id = id).first()
    db.session.delete(task)
    db.session.commit()
    return jsonify(message = "task deleted")


@app.route('/')
def app_works():
    return 'App is working'


if __name__ == '__main__':
   db.create_all()
   app.run(debug=True)