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
.. py:module:: todo.validator.task_validator
'''

from fantastico.roa.resource_validator import ResourceValidator
from fantastico.roa.roa_exceptions import FantasticoRoaError

class TaskValidator(ResourceValidator):
    '''This is the task validator invoked automatically in create / update operations.'''

    def validate(self, resource):
        '''This method is invoked automatically in order to validate resource body.'''

        errors = []

        if resource.name is None or len(resource.name) == 0:
            errors.append("Name attribute is mandatory.")

        if resource.status is None:
            errors.append("Status attribute is mandatory.")

        if resource.userid is None or len(resource.userid) == 0:
            errors.append("Userid attribute is mandatory.")

        if len(errors) == 0:
            return

        raise FantasticoRoaError("\n".join(errors))
