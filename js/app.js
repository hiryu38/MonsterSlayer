//TODO: refactor generating damage calculation
//IDEAS : damage status more depending on other status like, vitality, strength, defence etc?
//IDEAS : adding Animation?
//IDEAS : more monsters
//IDEAS : more stages, more levels,

new Vue({
  el: "#app",
  data() {
    return {
      monsterHP: 100,
      heroHP: 100,
      game: false,
      gameLog: []
    };
  },
  methods: {
    startGame() {
      this.monsterHP = 100;
      this.heroHP = 100;
      this.game = true;
      this.gameLog = [];
    },
    attack() {
      var damage = Math.floor(Math.random() * 11);
      this.monsterHP -= damage;
      this.log("HERO", "ATTACK", damage);
      this.monsterAttack();
    },
    specialAttack() {
      var damage = Math.floor(Math.random() * 11) + 11;
      this.monsterHP -= damage;
      this.log("HERO", "SPECIAL ATTACK", damage);
      this.monsterAttack();
    },
    heal() {
      var heal = Math.floor(Math.random() * 11);
      if (this.heroHP + heal > 100) {
        this.heroHP = 100;
      } else {
        this.heroHP += heal;
      }
      this.log("HERO", "HEAL", heal);
      this.monsterAttack();
    },
    monsterAttack() {
      var damage = Math.floor(Math.random() * 20);
      this.heroHP -= damage;
      this.log("MONSTER", "ATTACK", damage);
    },
    log(character, action, value) {
      var message;
      if (action == "HEAL") {
        message = character + " cured " + value + " HP";
      } else {
        message = character + "s " + action + ": " + value + " HP Damage";
      }
      this.gameLog.unshift(message);
    }
  },
  computed: {
    heroHealth() {
      return {
        width: this.heroHP + "%"
      };
    },
    monsterHealth() {
      return {
        width: this.monsterHP + "%"
      };
    }
  },
  watch: {
    heroHP() {
      if (this.heroHP <= 0) {
        alert("GAME OVER");
        this.game = false;
        this.monsterHP = 100;
        this.heroHP = 100;
        this.gameLog = [];
      }
    },
    monsterHP() {
      if (this.monsterHP <= 0 && this.heroHP > 0) {
        alert("YOU WON");
        this.game = false;
        this.monsterHP = 100;
        this.heroHP = 100;
        this.gameLog = [];
      }
    }
  }
});
