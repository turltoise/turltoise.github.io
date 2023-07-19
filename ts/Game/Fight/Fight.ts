class Fight {
	private _orderPlay: Map<string, string>;
	_currentPlay: string;
	constructor() {
		this._orderPlay = new Map();
		this._currentPlay = null;
	}

	playTurn() {
		//doStatusOfCurrentCard()
		//doActionOfCUrrentCard()
	}

	//vitessee 1 à 100 // plus grosse pour les gros niveau mais c'est  tout

	#setOrderPlay() {
		// pour chaque carte
		// regarder vitesse
		// trier par ordre de vitesse

		// toutes cartes
	}

	#doAction() {
		// lit la carte courante
		// selectionne une action au hasard (ou action prioritaire)
		// action avec utilisation limitée ?
		// appliquee l'action sur l'enemie [choix de l'enemie à faire]
		//réplique de l'enemie
		// à chaque loop
	}

	#doStatus() {
		// lit la liste des status en cours
		// applique l'effet du status
		// si plus de status tick statut disparait 
		// à chaque loop
	}
}

export default Fight;