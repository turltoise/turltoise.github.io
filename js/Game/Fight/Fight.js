var _Fight_instances, _Fight_setOrderPlay, _Fight_doAction, _Fight_doStatus;
class Fight {
    constructor() {
        _Fight_instances.add(this);
        this._orderPlay = new Map();
        this._currentPlay = null;
    }
    playTurn() {
        //doStatusOfCurrentCard()
        //doActionOfCUrrentCard()
    }
}
_Fight_instances = new WeakSet(), _Fight_setOrderPlay = function _Fight_setOrderPlay() {
    // pour chaque carte
    // regarder vitesse
    // trier par ordre de vitesse
    // toutes cartes
}, _Fight_doAction = function _Fight_doAction() {
    // lit la carte courante
    // selectionne une action au hasard (ou action prioritaire)
    // action avec utilisation limitée ?
    // appliquee l'action sur l'enemie [choix de l'enemie à faire]
    //réplique de l'enemie
    // à chaque loop
}, _Fight_doStatus = function _Fight_doStatus() {
    // lit la liste des status en cours
    // applique l'effet du status
    // si plus de status tick statut disparait 
    // à chaque loop
};
export default Fight;
//# sourceMappingURL=Fight.js.map