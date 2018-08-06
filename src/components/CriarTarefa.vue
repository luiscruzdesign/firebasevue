<template>
  <div id="criar-tafera-container">
    <button @click="hidepanel=!hidepanel" id="criar-tarafa-btn">Criar tarefa</button>
    <div id="cadastro-tarefa-container" :class="{ hide : hidepanel }">
      <input type="text" v-model="item" placeholder="Name">
      <textarea rows="8" cols="80" v-model="itemDescription" placeholder="Description"></textarea>
      <div class="range-container">
        <label>Impact <span>{{impactRange}}</span></label>
        <input type="range" min="0" max="10" v-model="impactRange" id="inputImpact">
      </div>
      <div class="range-container">
        <label>Confidence <span>{{confidenceRange}}</span></label>
        <input type="range" min="0" max="10" v-model="confidenceRange" id="inputConfidence">
      </div>
      <div class="range-container">
        <label>Ease <span>{{easeRange}}</span></label>
        <input type="range" min="0" max="10" v-model="easeRange" id="inputEase">
      </div>
      <div id="salvar-tarefa-btn-container">
        <button @click="addItem" id="salvar-tarefa-btn">Salvar</button>
      </div>
    </div>
  </div>
</template>

<script>
var inputImpact = document.getElementById("inputImpact");
var inputConfidence = document.getElementById("inputConfidence");
var inputEase = document.getElementById("inputEase");

export default {
  name: 'CriarTarefa',
  data () {
    return {
      item: null,
      itemDescription: null,
      impactRange: 5,
      confidenceRange: 5,
      easeRange: 5,
      hidepanel: true
    }
  },
  methods: {
    addItem() {
      firebase.database().ref('items').push({
        name: this.item,
        description: this.itemDescription,
        impact: this.impactRange,
        confidence: this.confidenceRange,
        ease: this.easeRange
      })
      .then((data)=>{
        console.log(data)
        this.item = '',
        this.itemDescription = '',
        this.impactRange = 5,
        this.confidenceRange = 5,
        this.easeRange = 5,
        inputImpact.value = 5,
        inputConfidence.value = 5,
        inputEase.value = 5
      })
      .catch((error)=>{console.log(error)});
    },
    editItem(key) {
      firebase.database().ref('items/' + key).set({
        name: this.editForm[key]
      })
    }
  }
}
</script>

<style scoped>
  #criar-tafera-container {
    padding: 20px;
  }
  #cadastro-tarefa-container {
    max-height: 500px;
    overflow: hidden;
    transition: 1s ease-in all;
    display: flex;
    flex-wrap: wrap;
  }
  #cadastro-tarefa-container.hide {
    max-height: 1px;
  }
  input, textarea {
    width: 100%;
  }
  button {
    color: #ffffff;
    background: #0b6ebd;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #0b6ebd;
    padding: 0 20px;
    font-weight: bold;
  }
  #criar-tarafa-btn {
    display: block;
  }
  #salvar-tarefa-btn {
    background: green;
    border: 1px solid green;
    margin-top: 10px;
  }
  input[type="text"] {
    height: 40px;
    margin: 20px 0;
    border: 1px solid #0b6ebd;
    text-indent: 20px;
  }
  textarea {
    border: 1px solid #0b6ebd;
    resize: none;
    padding: 15px 5px 0 20px;
    height: 65px;
    margin-bottom: 20px;
  }
  .range-container {
    width: 33.3%;
    padding: 0 10px;
    box-sizing: border-box;
  }
  .range-container:first-of-type {
    padding-left: 0;
  }
  .range-container:last-of-type {
    padding-right: 0;
  }
  #salvar-tarefa-btn-container {
    width: 100%;
    text-align: right;
  }
</style>
