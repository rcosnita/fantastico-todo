'''
Copyright 2013 Cosnita Radu Viorel

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

.. codeauthor:: Radu Viorel Cosnita <radu.cosnita@gmail.com>
.. py:module:: todo.models.tasks
'''

from fantastico.mvc import BASEMODEL
from fantastico.roa.resource_decorator import Resource
from sqlalchemy.schema import Column
from sqlalchemy.types import Integer, String, Text, SmallInteger
from todo.frontend.validators.task_validator import TaskValidator

@Resource(name="Task", url="/tasks", validator=TaskValidator)
class Task(BASEMODEL):
    '''This class provides the task model required for todo application.'''

    __tablename__ = "tasks"

    task_id = Column("task_id", Integer, primary_key=True, autoincrement=True)
    name = Column("name", String(200), nullable=False)
    description = Column("description", Text)
    status = Column("status", SmallInteger, nullable=False)
    userid = Column("userid", String(200), nullable=False)

    def __init__(self, name=None, description=None, status=0, userid=None):
        self.name = name
        self.description = description
        self.status = status
        self.userid = userid
