# Spring Security: Grundlagen absichern

*Testen, Sicherheit & Betrieb · ca. 9 Min.*

Spring Security setzt eine Kette von Filtern vor die Anwendung. Zwei Begriffe muss man auseinanderhalten: **Authentifizierung** klärt *wer* jemand ist, **Autorisierung** klärt, *was* diese Person darf.

Konfiguriert wird heute programmatisch über eine `SecurityFilterChain`\-Bean. Wichtig für APIs: Wenn du zustandslos mit Tokens arbeitest, brauchst du keinen CSRF-Schutz — bei formularbasierten Sitzungen mit Cookies dagegen unbedingt. Pauschales Abschalten ohne diese Unterscheidung ist einer der häufigsten Sicherheitsfehler.

Passwörter werden über einen `PasswordEncoder` gespeichert — `BCryptPasswordEncoder` ist die Standardwahl (Modul 20).

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    SecurityFilterChain api(HttpSecurity http) throws Exception {
        return http
            .securityMatcher("/api/**")
            .csrf(csrf -> csrf.disable())          // vertretbar: zustandsloses Token-API
            .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(HttpMethod.GET, "/api/oeffentlich/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated())
            .oauth2ResourceServer(o -> o.jwt(Customizer.withDefaults()))
            .build();
    }

    @Bean
    PasswordEncoder passwordEncoder() { return new BCryptPasswordEncoder(12); }
}
```

> **Tipp:** Achte auf die Reihenfolge der Regeln: Spring Security wertet sie von oben nach unten aus, die erste passende gewinnt. Steht anyRequest().permitAll() zu weit oben, sind alle folgenden Einschränkungen wirkungslos — und der Code sieht trotzdem abgesichert aus. Deshalb gehört an das Ende immer anyRequest().authenticated() oder .denyAll(): Was nicht ausdrücklich erlaubt wurde, ist verboten.

## Kontrollfragen

**1. Was unterscheidet Authentifizierung von Autorisierung?**

- [ ] Kein Unterschied
- [x] Authentifizierung klärt wer jemand ist, Autorisierung was er darf
- [ ] Autorisierung kommt zuerst

*Erklärung:* Erst die Identität feststellen, dann die Berechtigungen prüfen.

**2. Warum gehört anyRequest().authenticated() ans Ende der Regelkette?**

- [ ] Aus Stilgründen
- [x] Weil die erste passende Regel gewinnt und alles nicht ausdrücklich Erlaubte verboten sein soll
- [ ] Weil Spring das erzwingt

*Erklärung:* Eine zu früh platzierte permitAll-Regel macht alle folgenden Einschränkungen wirkungslos.
