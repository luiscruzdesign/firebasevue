<template>
  <div id="criar-tafera-container">
    <button @click="hidepanel=!hidepanel" id="criar-tarafa-btn">Create task</button>
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
        <button @click="addItem" id="salvar-tarefa-btn">Save task</button>
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
      item: '',
      itemDescription: '',
      impactRange: 5,
      confidenceRange: 5,
      easeRange: 5,
      hidepanel: true
    }
  },
  methods: {
    addItem() {
      var total = Number(this.impactRange) + Number(this.confidenceRange) + Number(this.easeRange)
      firebase.database().ref('items').push({
        name: this.item,
        description: this.itemDescription,
        impact: this.impactRange,
        confidence: this.confidenceRange,
        ease: this.easeRange,
        total: total
      })
      .then((data)=>{
        console.log(data)
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
    transition: 0.3s linear all;
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
  button:focus {
    outline: none;
  }
  #criar-tarafa-btn {
    display: block;
  }
  #salvar-tarefa-btn {
    background: green;
    border: 1px solid green;
    margin-top: 10px;
  }
  input[type="text"], textarea {
    font-size: 14px;
  }
  input[type="text"] {
    height: 40px;
    margin: 20px 0;
    border: 3px solid #0b6ebd;
    text-indent: 20px;
    border-radius: 5px;
    background: #ececec;
    color: #000000;
  }
  input[type="text"]:focus, textarea:focus {
    border: 3px solid #1c97fb;
    outline: none;
    background: #ffffff;
  }
  textarea {
    border: 3px solid #0b6ebd;
    resize: none;
    padding: 15px 5px 0 20px;
    height: 65px;
    margin-bottom: 20px;
    border-radius: 5px;
    background: #ececec;
    color: #000000;
  }
  .range-container {
    width: 33.3%;
    padding: 0 10px;
    box-sizing: border-box;
  }
  .range-container:first-of-type {
    padding-left: 0;
  }
  .range-container:nth-last-of-type(3) {
    padding-right: 0;
  }
  #salvar-tarefa-btn-container {
    width: 100%;
    text-align: right;
  }
  /* CSS for placeholders */
  ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
    color: #000000;
  }
  ::-moz-placeholder { /* Firefox 19+ */
    color: #000000;
  }
  :-ms-input-placeholder { /* IE 10+ */
    color: #000000;
  }
  :-moz-placeholder { /* Firefox 18- */
    color: #000000;
  }
  /* CSS for type range */
  input[type=range] {
    -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
    width: 100%; /* Specific width is required for Firefox. */
    background: transparent; /* Otherwise white in Chrome */
  }

  input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
  }

  input[type=range]:focus {
    outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
  }

  input[type=range]::-ms-track {
    width: 100%;
    cursor: pointer;

    /* Hides the slider so custom styles can be added */
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
  /* Special styling for WebKit/Blink */
  input[type=range]::-webkit-slider-thumb {
    border: 2px solid #0b6ebd;
    height: 16px;
    width: 16px;
    border-radius: 8px;
    background: #ffffff;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -4px;
  }
  /* All the same stuff for Firefox */
  input[type=range]::-moz-range-thumb {
    border: 2px solid #0b6ebd;
    height: 16px;
    width: 16px;
    border-radius: 8px;
    background: #ffffff;
    cursor: pointer;
    -webkit-appearance: none;
  }
  /* All the same stuff for IE */
  input[type=range]::-ms-thumb {
    border: 2px solid #0b6ebd;
    height: 16px;
    width: 16px;
    border-radius: 8px;
    background: #ffffff;
    cursor: pointer;
    -webkit-appearance: none;
  }
  input[type=range]::-webkit-slider-runnable-track {
    width: 100%;
    height: 8px;
    cursor: pointer;
    background: #0b6ebd;
    border-radius: 10px;
  }

  input[type=range]:focus::-webkit-slider-runnable-track {
    background: #1c97fb;
  }

  input[type=range]::-moz-range-track {
    width: 100%;
    height: 8px;
    cursor: pointer;
    background: #0b6ebd;
    border-radius: 10px;
  }
  /*
  input[type=range]::-ms-track {
    width: 100%;
    height: 8px;
    cursor: pointer;
    background: #0b6ebd;
    border-radius: 10px;
    border-color: transparent;
    border-width: 16px 0;
    color: transparent;
  }
  input[type=range]::-ms-fill-lower {
    background: #0b6ebd;
    border: 0.2px solid #010101;
    border-radius: 2.6px;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  }
  input[type=range]:focus::-ms-fill-lower {
    background: #3071a9;
  }
  input[type=range]::-ms-fill-upper {
    background: #3071a9;
    border: 0.2px solid #010101;
    border-radius: 2.6px;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  }
  input[type=range]:focus::-ms-fill-upper {
    background: #367ebd;
  }*/
</style>
