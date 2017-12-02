<template>
  <div class="col-sm-12 col-md-6 col-lg-4">      
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">{{event.title}}</h4>
        <p class="card-text">{{event.description}}</p>
        <ul class="list-group">
          <li class="list-group-item">Date: {{ event.date }}</li>
          <li class="list-group-item">Location: {{ event.location }}</li>
          <li class="list-group-item">Host: {{ event.email }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['event']
}
</script>
