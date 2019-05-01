# A better alternative

There is a powershell version inspired by this project, which is easier to use.

https://github.com/Indigo744/wlanprofilemanager-ps

I would suggest using the above powershell version, thus this project is deprecated.

# How to use

- install nodejs
- clone this repository
- copy the profiles.sample.js to profiles.js
- add your own profile to the profiles.js with the key of ssid
- register a taks in task scheduler(control panel->administration tools->task scheduler)
    - pick up the wpm.bat as the operation of the task
    - make sure the task will be executed by user "SYSTEM"
    - define the trigger as following:
        - start at: event
        - basic, log: Microsoft-Windows-WLAN-AutoConfig/Operational
        - source: WLAN-AutoConfig
        - event id: 11001
