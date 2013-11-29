'''Copyright 2013 Cosnita Radu Viorel

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.'''

from fantastico.settings import BasicSettings

class BaseProfile(BasicSettings):
    '''todo web application base profile.'''

    @property
    def database_config(self):
        '''This property is automatically invoked by fantastico in order to connect to database.'''

        db_config = super(BaseProfile, self).database_config

        db_config["database"] = "tododb"
        db_config["username"] = "todo_user"
        db_config["password"] = "12345"

        return db_config

    @property
    def roa_api(self):
        '''This method overrides the default roa api location to a separate domain.'''

        return "http://api.fantastico.com:12000"
