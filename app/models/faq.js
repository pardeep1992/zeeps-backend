module.exports = (sequelize, Sequelize) => {
    const FAQ = sequelize.define('faq', {     
      question: {
        type: Sequelize.STRING,
        unique: true,
      },
      answer: Sequelize.STRING,
      status: Sequelize.BOOLEAN,  
    });
  
    FAQ.associate = (models) => {
        
    };
  
    return FAQ;
  };
  