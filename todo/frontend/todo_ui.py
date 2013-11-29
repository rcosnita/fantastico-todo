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
.. py:module:: todo.frontend.ui
'''

from fantastico.mvc.base_controller import BaseController
from fantastico.mvc.controller_decorators import Controller, ControllerProvider
from webob.response import Response
import uuid

@ControllerProvider()
class TodoUi(BaseController):
    '''This class provides all routes used by todo frontend application.'''

    _MAX_AGE = 3600
    _USERID_COOKIE = "fantastico.userid"

    @Controller(url="/frontend/ui/index")
    def get_index(self, request):
        '''This method returns the index of todo ui application.'''

        append_cookie = False
        userid = request.cookies.get(self._USERID_COOKIE)

        if not userid:
            append_cookie = True
            userid = uuid.uuid4()

        content = self.load_template("listing.html")

        response = Response(content)

        if append_cookie:
            response.set_cookie(self._USERID_COOKIE, value=str(userid), max_age=self._MAX_AGE, path="/",
                                secure=False)

        return response

    @Controller(url="/frontend/ui/tasks-list-menu")
    def get_tasks_menu(self, request):
        '''This method return the tasks list menu.'''

        content = self.load_template("listing_menu.html")

        return Response(content)

    @Controller(url="/frontend/ui/tasks-list-content")
    def get_tasks_content(self, request):
        '''This method returns the markup for tasks listing content area.'''

        content = self.load_template("listing_content.html")

        return Response(content)

    @Controller(url="/frontend/ui/tasks-list-pager")
    def get_tasks_pager(self, request):
        '''This method returns the markup for tasks listing pagination area.'''

        content = self.load_template("listing_pager.html")

        return Response(content)
