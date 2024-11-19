<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet"> <!-- Font de base-->
</head>
<body>
    <div>
        <p>Bonjour {{$commande->user->prenom}} !</p>
        <p>Merci pour votre commande! Vous trouverez ci-dessous le reçu de votre commande.</p>

        @if ($commande->type_commande->nom == "Payée séparément")
            <p>Vous pouvez l'acquitter par virement Interac à l'adresse courriel : <span class="font-bold">cavistefaimdestemps@gmail.com</span>.</p>
            <p>La réponse à la question de sécurité doit être <span class="font-bold">« Corbeau »</span>.</p>
        @endif

        <br>
        <p>Passez une excellente soirée et merci d'acheter local!</p>

        <br>
        <p class="font-lg">Yannick Pellerin</p>
        <p>Chef exécutif</p>
        <a href="https://lafaimdestemps.com">lafaimdestemps.com</a>
    </div>

</body>
</html>
