keyfile-permissions:
		chmod 400 ansible/keys/welltory-backend.pem

stage_provision: keyfile-permissions
		ansible-playbook -i ansible/inventory/stage --extra-vars "project_root=$(shell pwd)" ansible/staging.yml

stage_deploy: keyfile-permissions
		ansible-playbook -i ansible/inventory/stage --extra-vars "project_root=$(shell pwd)" --tags deploy ansible/staging.yml

stage_mosh:
		mosh dashboard@146.185.171.104 -- tmux a
