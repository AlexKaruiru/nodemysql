import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin',
        email: 'admin@example.com',
        phone: '09876543',
        password: bcrypt.hashSync('123456', 10),
        role: 'admin',  
    },
    {
        name: 'Support',
        email: 'support@example.com',
        phone: '09876540',
        password: bcrypt.hashSync('123456', 10),
        role: 'support',  
    },
    {
        name: 'Supervisor',
        email: 'supervisor@example.com',
        phone: '09876545',
        password: bcrypt.hashSync('123456', 10),
        role: 'supervisor',  
    },
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: bcrypt.hashSync('123456', 10),
        phone: '09876541',
        role: 'agent',  
    },
    {
        name: 'Jane Doe',
        email: 'jane@example.com',
        phone: '09876542',
        password: bcrypt.hashSync('123456', 10),
        role: 'agent',
    },
    {
        name: 'Tom Doe',
        email: 'tom@example.com',
        phone: '09876544',
        password: bcrypt.hashSync('123456', 10),
        role: 'agent',
    }
];

export default users;
