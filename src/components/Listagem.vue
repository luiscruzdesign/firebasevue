<template>
  <div>
    <ul>
      <li v-for="(itemName,key) in items" :key="key">
        <span>
          <strong>{{itemName.name}}</strong>
          <p>{{itemName.description}}</p>
          Impact ({{itemName.impact}})
          Conficence ({{itemName.confidence}})
          Ease ({{itemName.ease }})
        </span>
        <button class="btn btn-xs btn-primary" @click="deleteItem(key)">Delete</button>
        <!--
        <button class="btn btn-xs btn-primary">Edit</button>
        <button class="btn btn-xs btn-primary" @click="deleteItem(key)">Delete</button>
        <input type="text" v-model="editForm[key]" class="form-control" @keyup.enter="editItem(key)">
        -->
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Listagem',
  data () {
    return {
      items: [],
      editForm: []
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
    },
    deleteItem(key) {
      firebase.database().ref('items/' + key).remove();
    }
  },
  created() {
    firebase.database().ref('items').on('value', (snapshot)=> {
      //console.log(snapshot.val());
      this.items=snapshot.val();
    })
  }
}
</script>

<style scoped>
  ul {
    margin: 0;
    padding: 0;
  }
  li {
    text-align: left;
    list-style-type: none;
    padding: 10px 0 10px 20px;
  }
  li:nth-of-type(odd) {
    background: #f1f1f1;
  }
  li:nth-of-type(even) {
    background: #e0e0e0;
  }
</style>
