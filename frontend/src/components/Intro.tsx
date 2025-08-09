export default function Intro() {
  return (
    <div className="w-full max-w-3xl mx-auto bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-10 border border-gray-200">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-6 tracking-tight">
        Benvenuto su LoanMate
      </h1>

      <p className="text-gray-700 mb-6 text-center text-lg leading-relaxed">
        LoanMate è la soluzione digitale pensata per privati e imprese che
        desiderano <strong>gestire richieste di finanziamento</strong> in
        maniera rapida, sicura e trasparente. La nostra piattaforma unisce
        tecnologia all’avanguardia e competenza finanziaria per offrirti
        un’esperienza di gestione prestiti chiara ed efficiente.
      </p>

      <ul className="space-y-3 text-gray-700 mb-8 text-lg">
        <li className="flex items-center space-x-3">
          <span className="text-2xl">📄</span>
          <span>
            Compila richieste in pochi click, con procedure semplici e guidate
          </span>
        </li>
        <li className="flex items-center space-x-3">
          <span className="text-2xl">🔍</span>
          <span>Monitora in tempo reale lo stato delle tue domande</span>
        </li>
        <li className="flex items-center space-x-3">
          <span className="text-2xl">🛡️</span>
          <span>Proteggi i tuoi dati con i più alti standard di sicurezza</span>
        </li>
      </ul>

      <p className="text-gray-700 mb-6 text-center text-lg leading-relaxed">
        <strong>Con LoanMate</strong> puoi contare su tempi di risposta ridotti,
        comunicazioni trasparenti e un supporto costante per ogni fase della tua
        richiesta.
      </p>

      <p className="text-center text-sm text-gray-500 italic">
        Inizia oggi stesso: registrati o accedi per scoprire un nuovo modo di
        gestire le tue richieste di prestito.
      </p>
      <img
        src="/src/assets/AffareFatto.png"
        alt="Affare fatto"
        className="w-64 mx-auto mt-12 drop-shadow-lg"
      />
    </div>
  );
}
