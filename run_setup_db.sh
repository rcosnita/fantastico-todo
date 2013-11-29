#!/bin/bash

. pip-deps/bin/activate

/usr/bin/mysql --host=$MYSQL_HOST --user=root --password=$MYSQL_PASSWD --verbose -e "source sql/setup_database.sql"

echo "Database tododb created correctly." 

fsdk syncdb --db-command /usr/bin/mysql --comp-root todo

echo "All module_setup.sql / create_data.sql executed correctly."
