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
