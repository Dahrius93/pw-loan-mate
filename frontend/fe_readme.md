# Frontend Architecture – LoanMate

L'applicazione **LoanMate**, è stata sviluppata con **React + TypeScript**.

L'interfaccia consente:

- registrazione utente ( form → POST )
- modifica profilo utente ( form → POST )
- invio richiesta prestito ( form → POST )
- visualizzazione per l'utente dello stato delle richieste ( table <-- GET)
- login (utente o amministratore) ( form → POST )
- gestione delle richieste (accetta / rifiuta) - ( form → POST )
- visualizzazione documentazione API ( Accesso diretto a url )

---

## Pagine principali e componenti usati

### 1. `WelcomePage`

- Questa è la prima pagina visualizzata quando si accede.
- Mostra un breve messaggio di benvenuto.
- nella barra `Header` è possibile proseguire per login o registrazione utente
- in basso presente documentazione API per scopi didattici

### 2. `LoginPage`

- Questa pagina contiene un form da compilare con email e password utente.
- I dati vengono controllati e, se sono corretti, allora effettuo POST verso server che si occuperà di
  restituire un token se utente riconosciuto.

### 3. `RegisterPage`

- Questa pagina contiene un form da compilare con i dati dell'utente.
- I dati vengono controllati e se sono corretti allora effettuo POST verso server che si occuperà di registrare l'utente

### 4. `UserHomePage`

- Questa pagina è la home dell'utente che si è loggato.
- contiene un form `LoanForm` per esegure una richiesta di prestito tramite una chiamata POST
- contiene una lista `LoanList` con tutte le richieste effettuate e lo stato.

### 5. `UserProfilePage`

- Questa pagina permette all'utente loggato di cambiare i propri dati personali
- Se utente ha effettuato una richiesta di prestito e successivamente cambia i dati della richiesta rimangono invariati

### 6. `AdminHomePage`

- Questa è la pagina dell'amministratore.
- L'amministratore visualizza tutte le richieste `LoanList` con pulsanti accetta/rifiuta

## Flusso Utente

```text
WelcomePage.tsx
   ├──> LoginPage.tsx
   │     ├──> UserProfilePage.tsx (utente normale)
   │     └──> AdminHomePage.tsx (admin)
   └──> RegisterPage.tsx
   │     └──> LoginPage.tsx (dopo registrazione)
   │
   └──> Documentazione API

```
