export const response = {
    "status": "success",
    "board": {
        "id": "board_001",
        "name": "Project Board",
        "columns": [
            {
                "name": "Backlog",
                "tasks": [
                    {
                        "id": "task_001",
                        "title": "Hero section",
                        "priority": "high",
                        "due_date": "2024-02-10",
                        "checklist_count": 3,
                        "checklist": [
                            { text: 'Task to be done', done: true },
                            { text: 'Task to be done', done: false },
                            { text: 'Lorem Ipsum is a Dummy text', done: false }
                        ],
                        "dueDate": 'Feb 10th',
                        "completed_checklist_count": 1,
                        "assignees": ["S", "V", "K"]
                    },
                    {
                        "id": "task_002",
                        "title": "Hero section",
                        "priority": "high",
                        "due_date": "2024-02-12",
                        "checklist": [
                            { text: 'Task to be done', done: true },
                            { text: 'Task to be done', done: false },
                            { text: 'Lorem Ipsum is a Dummy text', done: false }
                        ],
                        "dueDate": 'Feb 10th',
                        "checklist_count": 1,
                        "completed_checklist_count": 0,
                        "assignees": []
                    }
                ]
            },
            {
                "name": "To-do",
                "tasks": [
                    {
                        "id": "task_003",
                        "title": "Typography change in first two screens",
                        "priority": "moderate",
                        "due_date": "2024-02-11",
                        "checklist_count": 0,
                        "checklist": [
                            { text: 'Task to be done', done: true },
                            { text: 'Task to be done', done: false },
                            { text: 'Lorem Ipsum is a Dummy text', done: false }
                        ],
                        "dueDate": 'Feb 10th',
                        "completed_checklist_count": 0,
                        "assignees": []
                    }
                ]
            },
            {
                "name": "Progress",
                "tasks": [
                    {
                        "id": "task_004",
                        "title": "Hero section",
                        "priority": "low",
                        "due_date": "2024-02-10",
                        "checklist": [
                            { text: 'Task to be done', done: true },
                            { text: 'Task to be done', done: false },
                            { text: 'Lorem Ipsum is a Dummy text', done: false }
                        ],
                        "dueDate": 'Feb 10th',
                        "checklist_count": 0,
                        "completed_checklist_count": 0,
                        "assignees": []
                    }
                ]
            },
            {
                "name": "Done",
                "tasks": [
                    {
                        "id": "task_005",
                        "title": "Hero section",
                        "priority": "high",
                        "due_date": "2024-02-10",
                        "checklist_count": 0,
                        "checklist": [
                            { text: 'Task to be done', done: true },
                            { text: 'Task to be done', done: false },
                            { text: 'Lorem Ipsum is a Dummy text', done: false }
                        ],
                        "dueDate": 'Feb 10th',
                        "completed_checklist_count": 0,
                        "assignees": []
                    }
                ]
            }
        ]
    }
};

export const addPeople = [
    {
        "_id": "6724a9888d3c6c48b6691cce",
        "name": "mythri",
        "email": "mythri@gmail.com",
        "__v": 0
    },
    {
        "_id": "6724a98b8d3c6c48b6691cd1",
        "name": "mythri",
        "email": "mythri@gmail.com",
        "__v": 0
    },
    {
        "_id": "6724a9fb794bf15402eeebb4",
        "name": "mythri",
        "email": "mythri@gmail.com",
        "__v": 0
    },
    {
        "_id": "6724aa15794bf15402eeebb7",
        "name": "mythri",
        "email": "mythri@gmail.com",
        "taskStatus": "in-progress",
        "__v": 0
    },
    {
        "_id": "6725e7e8bad77f116553eafd",
        "name": "mythrii",
        "email": "mythri@gmail.com",
        "taskStatus": "backlog",
        "__v": 0
    },
    {
        "_id": "6725e807a08dcbf5a984dc51",
        "email": "mythri@gmail.com",
        "taskStatus": "backlog",
        "__v": 0
    },
    {
        "_id": "6725e8530fe0e474dd37a8bd",
        "email": "mythri@gmail.com",
        "taskStatus": "backlog",
        "__v": 0
    },
    {
        "_id": "6725e8670fe0e474dd37a8c0",
        "email": "minni@gmail.com",
        "taskStatus": "backlog",
        "__v": 0
    },
    {
        "_id": "6725e883cf8c4c086b7649d2",
        "email": "minni@gmail.com",
        "taskStatus": "backlog",
        "__v": 0
    },
    {
        "_id": "6725e8a227ef382dd38ae3c3",
        "name": "minni",
        "email": "minni@gmail.com",
        "taskStatus": "backlog",
        "__v": 0
    },
    {
        "_id": "6725e8c09060da32bfdb130b",
        "username": "minni",
        "userid": "6721ca0cdd08604002c613a7",
        "email": "minni@gmail.com",
        "taskStatus": "backlog",
        "__v": 0
    }
]