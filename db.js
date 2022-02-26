const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_react_db');


const User = sequelize.define('user', {
    name: Sequelize.DataTypes.STRING,
    bio: Sequelize.DataTypes.TEXT,

}, {
    hooks: {
        beforeCreate: function(user) {
            if(!user.bio) {
                user.bio = `this is the bio of my acme users- the name is ${user.name}!! They are all great.  i typed this out because my faker is not working. ${user.name} loves to play all kinds of sports. GOOOO ${user.name.toUpperCase()}!!!`
            }
        }
    }
})

User.createWithName = (name) => User.create({name})

const seed = async() => {
    await sequelize.sync({force:true})
    const [moe,lucy,curly] = await Promise.all(
        ['moe','lucy','curly'].map(User.createWithName)
    );
    
    
}

module.exports = {
    models: {
        User
    },
    seed
}
