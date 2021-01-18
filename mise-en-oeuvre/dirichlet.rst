Condition de Dirichlet
======================

Homogène
--------

Nous introduisons alors un espace de Sobolev qui prend en compte la condition de Dirichlet.

.. math:: \Hoz = \enstq{u\in\Ho}{u|_{\partial\Omega} = 0},


Si :math:`V_h` est l'espace des éléments finis :math:`\Pb^1` sur :math:`\Omega`, alors une discrétisation naturelle de :math:`\Hoz` est l'espace :math:`\Vhz` défini par


.. math:: \Vhz = \enstq{u\in V_h}{ u|_{\Gamma_D} = 0}

Mais nous pouvons aussi raisonner sur le système linéaire directement. Nous séparons les degrés de liberté en deux sous-ensembles :

1. Ceux qui appartiennent à :math:`\Omega` ou à :math:`\Gamma_N` : nous les noterons avec un indice :math:`I` (pour Intérieur) : :math:`u_I`
2. Ceux qui appartiennent à :math:`\Gamma_D`, ils seront notés avec un indice :math:`D` : :math:`u_D`

Quitte à renuméroter, le vecteur :math:`U` de degrés de liberté se réécrit

.. math:: 

  U =\left(
    \begin{array}{c}
      u_I\\
      u_D
    \end{array}
  \right),

et le système linéaire :math:`AU = b`  devient :

.. math:: 
  AU = b \iff \left(
  \begin{array}{c c}
    A_{I,I}  & A_{I, D}\\
    A_{D, I} & A_{D,D}
  \end{array}
  \right) \left(
    \begin{array}{c}
      u_I\\
      u_D
    \end{array}
  \right) =  \left(
    \begin{array}{c}
      b_I\\
      b_D
    \end{array}
  \right)

Les degrés de liberté :math:`u_D` sont en réalité fixés à 0 du fait de la condition de Dirichlet, autrement dit, le système à résoudre se résume à (:math:`I_{D,D}` étant la matrice identité) :

.. math:: 

  AU = b \iff 
  \left(
    \begin{array}{c c}
      A_{I,I}  &A_{I,D}\\
      0 & I_{D,D}
    \end{array}
  \right)
  \left(
    \begin{array}{c}
      u_I\\
      u_D
    \end{array}
  \right)  = 
  \left(
    \begin{array}{c}
      b_I\\
      0
    \end{array}
  \right)

Informatiquement, nous devons donc rendre les lignes et colonnes associées aux degrés de liberté de Dirichlet, nulles, sauf sur la diagonale avec la valeur 1. Cette opération est souvent effectuée après l'assemblage de la matrice.

.. proof:remark::

  La valeur de 1 sur la diagonale est finalement arbitraire : nous pouvons choisir n'importe quelle valeur. Pour des raisons de précision numérique, il peut être plus pertinent de choisir comme valeur la moyenne de la somme de la diagonale de :math:`A_{I,I}` (sa trace). Cette technique peu coûteuse permet d'éviter de polluer le conditionnement de la matrice par des valeurs potentiellement trop grande ou trop petite par rapport à la "moyenne".


.. proof:remark::

  Dans le cas de condition de Dirichlet homogène, ce système ce simplifie :

  .. math:: 
    AU = b \iff 
    \left(
      \begin{array}{c c}
        A_{I,I}  & 0\\
        0 & I_{D,D}
      \end{array}
    \right)
    \left(
      \begin{array}{c}
        u_I\\
        u_D
      \end{array}
    \right)  = 
    \left(
      \begin{array}{c}
        b_I\\
        0
      \end{array}
    \right),

  ou encore, plus simplement : :math:`A_{I,I} u_I = b_I`.


Condition hétérogène
--------------------

Notion de relèvement
++++++++++++++++++++

Nous considérons maintenant le cas d'une condition de Dirichlet non homogène, autrement dit, si :math:`g\in L^2(\Gamma_D)` et :math:`g\neq 0` :

.. math:: 

  \left\{
    \begin{array}{r c l l}
      -\Delta u & = & f & (\Omega)\\
      u & =  & g & (\Gamma_D)\\
      \dn u & =  & w & (\Gamma_N)
    \end{array}
  \right.


Nous pouvons introduire l'espace suivant

.. math:: \Hog = \enstq{u\in \Ho}{ u|_{\GammaD} = \gD},

mais ce **n'est pas un espace vectoriel** ! Pour remédier à ce problème, nous nous ramenons au cas d'une condition de Dirichlet homogène en introduisant un *relèvement* :math:`u_g` de :math:`g` : une fonction de :math:`\Ho` telle que :math:`\gamma_{\Gamma_D}u_g = g`. Nous ne nous préoccuperons pas de savoir si une telle fonction existe et supposons que tel est le cas [#]_. Le problème devient alors de chercher :math:`\ut = u-u_g` satisfaisant :

.. math:: 
  
  \left\{
    \begin{array}{r c l l}
      -\Delta \ut & = & f +\Delta u_g & (\Omega)\\
      \ut & =  & 0 & (\Gamma_D)\\
      \dn \ut & =  & h & (\Gamma_N)
    \end{array}
  \right.


.. proof:remark::

  Le relèvement n'est pas unique, puisque si :math:`u_0\in\Hoz` alors :math:`u_g + u_0` est aussi un relèvement acceptable.


Relèvement en :math:`\Pb^1`
+++++++++++++++++++++++++++

En éléments finis :math:`\Pb^1`, un relèvement naturel est la fonction :math:`u_{h, g}` de :math:`\Vh` telle que

.. math:: 

  u_{h,g}(\vertice_j) =
    \left\{
    \begin{array}{l l}
      g(\vertice_j) & \text{ si }\vertice_j\in\Gamma_D,\\
      0 & \text{ sinon.}
    \end{array}
  \right.

Cette fonction n'est pas un relèvement de :math:`g` puisqu'elle ne coïncide avec :math:`g` que sur les sommets, mais pas nécessairement entre les sommets. Toutefois, au niveau discret, elle remplit ce rôle : c'est **un relèvement de l'interpolée** :math:`g_h = \Pi_h g` de :math:`g` sur l'espace éléments finis (la différence est subtile mais importante).

En pratique, la matrice est alors décomposée ainsi :

.. math:: 

  AU = b \iff 
  \left(
    \begin{array}{c c}
      A_{I,I}  & A_{I, D}\\
      0 & I_{D,D}
    \end{array}
  \right)
  \left(
    \begin{array}{c}
      u_I\\
      u_D
    \end{array}
  \right) = \left(
    \begin{array}{c}
      b_I\\
      g_h
    \end{array}
  \right).

La matrice obtenue est non symétrique, ce qui peut poser des problèmes (par ex. augmentation du coût de stockage mémoire). Une astuce simple consiste à réécrire sous la forme suivante :

.. math:: 

  AU = b \iff 
  \left(
    \begin{array}{c c}
      A_{I,I}  & 0\\
      0 & I_{D,D}
    \end{array}
  \right)
  \left(
    \begin{array}{c}
      u_I\\
      u_D
    \end{array}
  \right)  =   \left(
    \begin{array}{c}
      b_I - A_{I,D} g_h\\
      g_h
    \end{array}
  \right).

.. [#] En réalité, :math:`g` doit appartenir à l'espace :math:`H^{\frac{1}{2}}(\partial\Omega)`