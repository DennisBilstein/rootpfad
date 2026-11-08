<template>
  <a href="#main">Zum Inhalt</a>
  <nav aria-label="Hauptnavigation"><RouterLink :to="{ name: 'tasks' }">Aufgaben</RouterLink> · <RouterLink :to="{ name: 'about' }">Über das Labor</RouterLink></nav>
  <main id="main" tabindex="-1"><RouterView /></main>
</template>
