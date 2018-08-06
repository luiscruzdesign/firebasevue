<template>
  <div>
    <button @click="hidepanel=!hidepanel">Criar tarefa</button>
    <div id="cadastro-tarefa-container" :class="{ hide : hidepanel }">
      <input type="text" v-model="item" placeholder="Name">
      <textarea rows="8" cols="80" v-model="itemDescription" placeholder="Description"></textarea>
      <div>
        <label>Impact <span>{{impactRange}}</span></label>
        <input type="range" min="0" max="10" v-model="impactRange" id="inputImpact">
      </div>
      <div>
        <label>Confidence <span>{{confidenceRange}}</span></label>
        <input type="range" min="0" max="10" v-model="confidenceRange" id="inputConfidence">
      </div>
      <div>
        <label>Ease <span>{{easeRange}}</span></label>
        <input type="range" min="0" max="10" v-model="easeRange" id="inputEase">
      </div>
      <button @click="addItem">Salvar</button>
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
  #cadastro-tarefa-container {
    max-height: 500px;
    overflow: hidden;
    transition: 1s ease-in all;
  }
  #cadastro-tarefa-container.hide {
    max-height: 1px;
  }
  input, textarea {
    width: 100%;
  }
</style>
