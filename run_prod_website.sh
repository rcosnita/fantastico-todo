#!/bin/bash

PATH=/bin:/usr/bin:/usr/sbin

. pip-deps/bin/activate

ps aux | grep uwsgi | awk '{print $2}' | xargs kill -9

export FANTASTICO_ACTIVE_CONFIG=todo.settings.AwsProfile
fantastico_run_prod_server