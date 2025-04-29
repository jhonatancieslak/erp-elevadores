const bcrypt = require('bcrypt');
const senha = 'Jcieslak@3202';     // troque para a senha desejada
bcrypt.hash(senha, 10)
  .then(hash => {
    console.log('HASH:', hash);
    process.exit();
  })
  .catch(err => console.error(err));
