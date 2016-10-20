#!/bin/bash

mysqldump --add-drop-table --skip-comments --skip-add-locks --skip-comments --skip-disable-keys -u root bible $1 | grep -v SET > $1.sql
