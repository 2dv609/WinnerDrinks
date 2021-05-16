# Notes

### Ansible and python required

* Tested with ansible version 2.9.6
* Tested with python 3.8.5

### Check reote servers availability

```
ansible all -m ping -u ubuntu --private-key <path_to_private_key>
```

### Update app
```
ansible-playbook update-winner-drinks.yaml -u ubuntu --private-key <path_to_private_key>
```
