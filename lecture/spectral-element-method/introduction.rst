Introduction
============


The spectral element method (or SEM) belongs to the family of finite element methods with the following differences:

* The mesh is built using hexahedra (quads in 2D)
* Matrices (Mass and Stiffness) are computed approximately but accurately using Gauss-Lobatto quadrature rules
* Degrees Of Freedom (DOF), or control points, are located on the the Gauss-Lobatto quadrature points

The spectral element methods has then the below properties:

* Mass matrix is diagonal (such as with lumped technic)
* Stiffness matrix is sparse
* Formulation is written for any order :math:`r` of polynoms
* Matrice coefficients are approximated (no analytic computation)


These make the method very efficient from the numerical point of view especially for large scale problems and in particular for high order discretization. According to :ref:`Komatich`, SEM starts to be more efficient than FEM for order 4 to 10.

.. prf::remark:

  The method is called *spectral* because the mass matrix is diagonal but it is not based on spectral analysis of the operators.

Framework
---------

In this chapter is presented the method. To simplify, the positive scalar Helmholtz problem is considered, with a real unknown :math:`u`,

.. math::

  \begin{cases}
  -\Delta u + k^2u = f & \text{ in }\Omega\\
  \dn u + \alpha ku = g & \text{ on } \partial\Omega,
  \end{cases}

where :math:`\Omega` is the computational domain, :math:`k` is the positive wavenumber, :math:`f` and :math:`g` are source terms, :math:`\nn=(n_1,n_2,n_3)` is the outward normal to :math:`\Omega` and :math:`\dn u = \nabla u\cdot \nn` the normal derivative, with :math:`\nabla` the Gradient operator :math:`\nabla u = [\dx u, \dy u, \dz u]^T`.  After multiplication by a test function :math:`v` and integrating by part, the weak formulation writes,

.. math:: 
  :label: eq-wf-basic

  \left\{\begin{aligned}
    &\text{Find } u \text{ in } H^1(\Omega) \text{ such that}\\
    &\forall v\in H^1(\Omega),\quad \int_{\Omega} k^2 u v\diff\Omega + \int_{\Omega} \nabla u \cdot \nabla v - \int_{\partial\Omega} \alpha uv \diff\partial\Omega = \int_{\Omega}fv \diff\Omega + \int_{\partial\Omega} gv \diff\partial\Omega,
  \end{aligned}\right.

The function space :math:`H^1(\Omega)` is the usual Sobolev space of weakly derivable function

.. math::

  H^1(\Omega) = \enstq{u \in L^2(\Omega)}{\nabla u \in (L^2(\Omega)^3}.

This space has a scalar product

.. math::

  \forall u,v\in H^1(\Omega),\quad \left(u,v\right)_{H^1(\Omega)} = \int_{\Omega} uv \diff\Omega + \int_{\Omega} \nabla u\cdot \nabla v \diff\Omega,

and an associated norm

.. math::

  \forall u \in H^1(\Omega),\qquad \|u\|^2_{H^1(\Omega)} = \int_{\Omega} |u|^2 \diff\Omega + \int_{\Omega} \|\nabla u\|^2 \diff\Omega,

where :math:`\xx \cdot\yy = \xx^T\yy` denotes the euclidian scalar product between vectors :math:`\xx` and :math:`\yy`. 


Geometric interpolation functions
---------------------------------

The domain :math:`\Omega` is discretized by a mesh :math:`\Th` composed of :math:`\Omega` composed by :math:`\Nelem` hexahedra :math:`\Kp, p=1,\ldots,\Nelem`:

.. math::
  
  \Th = \enstq{\Kp, p=1,\ldots,\Nelem}{\bigcup_{p=1}^{\Nelem} \Kp = \Omega}.

The quantity :math:`h` is the maximum diameter of the hexahedra and also called mesh refinement:

.. math::
  
  h = \max_{p} \left(\diam(\Kp)\right).

In this paper, the mesh is assumed to be conforming and linear, thus each hexadron :math:`\Kp` is composed of 8 vertices :math:`\ssb^p_{q} = (x^p_q, y^p_q, z^p_q)` for :math:`q=1,\ldots,8`. For every hexahedron :math:`\Kp`, we introduce the function :math:`\Fp` that maps the reference hexahedron :math:`\Kh = [-1,1]^3`, with vertices :math:`(\ssbh_{q})_{1\leq q\leq 8}`, to :math:`\Kp`:

.. math::

  \begin{array}{r c l l}
  \Fp \colon & \Kh& \longrightarrow & \Kp\\
  &\xxh = (\xh,\yh,\zh) & \longmapsto&(x,y,z) = \xx.
  \end{array}

The coordinates system :math:`(\xh,\yh,\zh)` is called parametrical coordinates whereas :math:`(x,y,z)` are the physical ones. For every :math:`p`, the transformation map :math:`\Fp` is assumed to be invertible and for linear hexahedra, :math:`\Fp` is given by

.. math::
  :label: eq-Kh-to-Kp

  \forall \xx\in \Kp, \exists! \xxh\in\Kh \text{ such that } \quad\xx=  \Fp(\xxh)  = \sum_{\ell = 1}^8 \ssb_{\ell}^p\psih_{\ell}(\xxh),

where, for :math:`\ell=1,\ldots,8`, the linear geometrical interpolation function :math:`\psih_{\ell}` is associated to the vertice :math:`\ssbh_{\ell}` and satisfies :math:`\psih_{\ell}(\ssbh_{k}) = \delta_{\ell k}`, for :math:`k=1,\ldots,8`. The expression of these functions can actually be calculated analytically:

+-------------------+-------------+-------------+-------------+---------------------------------------------------------------+
|:math:`\ssbh_\ell` | :math:`\xh` | :math:`\yh` | :math:`\zh` | :math:`\psih_\ell`                                            |
+===================+=============+=============+=============+===============================================================+
|:math:`\ssbh_1`    |-1           | -1          |-1           | :math:`\psih_1(\xxh) = \frac{1}{8}(1 - \xh)(1 - \yh)(1 - \zh)`|
+-------------------+-------------+-------------+-------------+---------------------------------------------------------------+
|:math;`\ssbh_2     |+1           | -1          | -1          | :math:`\psih_2(\xxh) = \frac{1}{8}(1 + \xh)(1 - \yh)(1 - \zh)`|
+-------------------+-------------+-------------+-------------+---------------------------------------------------------------+
|:math;`\ssbh_3     |-1           | +1          | -1          | :math:`\psih_3(\xxh) = \frac{1}{8}(1 - \xh)(1 + \yh)(1 - \zh)`|
+-------------------+-------------+-------------+-------------+---------------------------------------------------------------+
|:math;`\ssbh_4     |+1           | +1          | -1          | :math:`\psih_4(\xxh) = \frac{1}{8}(1 + \xh)(1 + \yh)(1 - \zh)`|
+-------------------+-------------+-------------+-------------+---------------------------------------------------------------+
|:math;`\ssbh_5     |-1           | -1          | +1          | :math:`\psih_5(\xxh) = \frac{1}{8}(1 - \xh)(1 - \yh)(1 + \zh)`|
+-------------------+-------------+-------------+-------------+---------------------------------------------------------------+
|:math;`\ssbh_6     |+1           | -1          | +1          | :math:`\psih_6(\xxh) = \frac{1}{8}(1 + \xh)(1 - \yh)(1 + \zh)`|
+-------------------+-------------+-------------+-------------+---------------------------------------------------------------+
|:math;`\ssbh_7     |-1           | +1          | +1          | :math:`\psih_7(\xxh) = \frac{1}{8}(1 - \xh)(1 + \yh)(1 + \zh)`|
+-------------------+-------------+-------------+-------------+---------------------------------------------------------------+
|:math;`\ssbh_8     |+1           | +1          | +1          | :math:`\psih_8(\xxh) = \frac{1}{8}(1 + \xh)(1 + \yh)(1 + \zh)`|
+-------------------+-------------+-------------+-------------+---------------------------------------------------------------+


Finite element space :math:`\Qb_r`
----------------------------------

For every order :math:`r \geq 1` and open set :math:`\omega \subset\Omega`, we introduce the space :math:`\Qr(\omega)` of polynomials on :math:`\omega` of maximum degree :math:`r` in each dimension:

.. math::

  \Qr(\omega) = \enstq{P\colon\omega\to\Rb}{P(x,y,z)  = \sum_{\ell=0}^{r}\sum_{m=0}^{r}\sum_{n=0}^{r}a_{\ell,m,n}\xh^{\ell}\yh^{m}\zh^{n}}.

For example for :math:`r=1` we retrieve the classical :math:`\Qb_1` space of dimension :math:`8`:

.. math::

  \begin{multlined}
    \Qb_1(\Kh) = \left\{P\colon\Kh\to\Rb \mathrel{}\middle|\mathrel{} \forall \xxh\in\Kh, \quad P(\xh,\yh,\zh)  = a_{0,0,0} + a_{1,0,0}\xh + a_{0,1,0}\yh + a_{0,0,1}\zh \right. \\
    + a_{1,1,0}\xh\yh + a_{1,0,1}\xh\zh + a_{0,1,1}\yh\zh+ a_{1,1,1}\xh\yh\zh\Big\}.
  \end{multlined}

We can now define the finite element space :math:`\Vhr \subset H^1(\Omega)` of continuous functions on :math:`\Omega` and piecewise polynomial of order :math:`r` on each element:

.. math::

  \Vhr = \enstq{\uh\in C^0(\overline{\Omega})}{\forall p=1,\ldots,\Nelem, \uh\restrict_{\Kp}\in\Qr(\Kp)}.

Using the transformation map :math:`\Fp`, :math:`\Vhr` can be rewritten as

.. math::
  
  \Vhr = \enstq{\uh\in C^0(\overline{\Omega})}{\forall p=1,\ldots,\Nelem, \uh\restrict_{\Kp}\circ\Fp\in\Qr(\Kh)}.


Approximate problem
-------------------

The weak formulation :eq:`eq-wf-basic` is rewritten in :math:`\Vhr` only. The solution :math:`\uh` of this approximate problem will be an approximation of :math:`u`:

.. math::
  :label: eq-wf-vhr

  \left\{\begin{aligned}
    &\text{find } \uh \text{ in } \Vhr \text{ such that}\\
    &\forall \vh\in \Vhr,\quad \int_{\Omega} k^2 \uh\vh\diff\Omega + \int_{\Omega} \nabla \uh \cdot \nabla \vh - \int_{\partial\Omega} \alpha u\vh \diff\partial\Omega = \int_{\Omega}f\vh\diff\Omega +\int_{\partial\Omega} g\vh \diff\partial\Omega ,
  \end{aligned}\right.

Basis Functions
---------------

The basis functions of the function space :math:`\Qb_r(\Kh)` of dimension :math:`(r+1)^3`  must now be defined. They are obtained by tensorisation of Lagrange polynomials. The control points of these polynomials are chosen to be the Gauss-Lobatto quadrature points. It is worth noting that the vertices of :math:`\Kh` are also control points and thus, for order :math:`r=1`, the control points of the \acrshort{sem} are the same as for the classical finite element method.

On the reference hexahedron :math:`\Kh`
+++++++++++++++++++++++++++++++++++++++

In the reference hexahedron :math:`\Kh = [-1,1]^3` only, the :math:`(r+1)^3` control points are denoted by :math:`\xibh_{i_1,i_2,i_3} = (\xh_{i_1}, \yh_{i_2}, \zh_{i_3}) \in \overline{\Kh}`, for :math:`1 \leq i_1,i_2,i_3\leq r+1` and with :math:`-1\leq \xh_{i_1},\yh_{i_2},\zh_{i_3}\leq 1`.  A more compact form may be used later by introducing the following set 

.. math::

  \Ib = \enstq{ \ib=(i,j,k) \in \Nb^3}{1\leq i,j,k \leq r+1},

such that :math:`\xibh_{\ib}=\xibh_{i_1,i_2,i_3}` with :math:`\ib = (i_1,i_2,i_3)`. It is worth recalling that for a hexahedron :math:`\Kp`, its control points :math:`\xib^p_{\ib}` can be computed using formula \eqref{eq-Kh-to-Kp}: :math:`\xib^p_{\ib} = \Fp(\xibh_{\ib})`. Finally and as :math:`\Kh= [-1,1]^3` is symmetric, the controls point are located such that :math:`\xibh_{\ib} = (\xih_{i_1}, \xih_{i_2}, \xih_{i3})` with :math:`-1\leq \xi_i\leq 1`. 

For :math:`1\leq i \leq r+1`, we now introduce the Lagrange polynomials :math:`\mphih_i\colon [-1,1]\to\Rb` of order :math:`r` associated to :math:`\xih_i`:

.. math::

  \forall x\in[-1,1],\qquad  \mphih_i(x) = \prod_{\substack{j=1\\ j\neq i}}^{r+1} \frac{x - \xih_j}{\xih_i - \xih_j}.

We can now define the basis function :math:`\Phih_{\ib}` associated to the control point :math:`\xibh_{{\ib}}`:

.. math::
  :label: eq-basis-function

  \forall \ib=(i_1,i_2,i_3)\in\Ib, \forall \xxh=(\xh,\yh,\zh) \in\Kh,\qquad \Phih_{\ib}(\xxh) = \mphih_{i_1}(\xh)\mphih_{i_2}(\yh)\mphih_{i_3}(\zh).

These basis functions satisfy the following property

.. math::
  :label: eq-phi-delta

  \forall \ib=(i_1,i_2,i_3), \jb=(j_1,j_2,j_3)\in\Ib,\qquad \Phih_{\ib}(\xibh_{\jb}) = \mphih_{i_1}(\xih_{j_1})\mphih_{i_2}(\xih_{j_2})\mphih_{i_3}(\xih_{j_3}) = \delta_{i_1j_1}\delta_{i_2j_2}\delta_{i_3j_3} = \delta_{\ib\jb}.

On a general hexahedron :math:`\Kp`
-----------------------------------


For an arbitrary hexahedron :math:`\Kp` of the mesh :math:`\Th`, the :math:`(r+1)^3` control points are denoted by $\xib_{p;i^p_1,i^p_2,i^p_3} = (\xh_{i_{p;1}}, \yh_{i_{p;2}}, \zh_{i_{p;3}}) \in \overline{\Kp}:math:`, for `1 \leq i_{p;1},i_{p;2},i_{p;3}\leq r+1$. The basis functions :math:`\Phi_{\ib}` are also a product between 3 Lagrange polynomials

.. math::

  \forall p=1,\ldots,\Nelem, \forall \ib\in\Ib, \forall \xx\in\Kp,\qquad \Phi^p_{\ib}(\xx)= \Phih_{\ib}\circ \Fp^{-1}(\xx),

We now have to define where the control points are located. For \acrshort{sem}, they will be merged with the Gauss-Lobatto quadrature points.

Gauss-Lobatto quadrature rule
+++++++++++++++++++++++++++++

Consider the quadrature of an integration of a polynome :math:`f` on :math:`[-1,1]`:

.. math::

  \int_{-1}^1 f(x)\diff x = \sum_{n=1}^{N+1} f(\xi_n)\omega_n + R_N,
 
where :math:`R_N` is the remaining part and :math:`(\xi_n,\omega_n)_{n=1,\ldots,N+1}` are the pairs of quadrature point and weight respectively. Gauss-Lobatto quadrature rule is similar to Gauss quadrature with the below features

* The integration points include the end points of the integration interval (:math:`x_1 = -1` and :math:`x_{N+1} = 1`).
* It is accurate (:math:`R_{N+1} = 0`) for polynomials up to degree :math:`2N -1`.

The fact that the end points are considered is helpful for finite element scheme to guarantee continuity and conformity between elements. Without entering into details, the point :math:`\xi_1` and :math:`\xi_N` are equal to respectively :math:`-1` and :math:`1` while :math:`(\xi_n)_{2\leq n\leq N}` are the roots of $P'_{N}:math:` if `P_{N+1}:math:` is the `(N+1)^{\rm th}-$degree Legendre polynomial and the prime denote the derivatie. The weights :math:`(\omega_n)_n` are given by

.. math::

  \forall n=1,\ldots, N+1,\quad  \omega_n = \begin{cases}
  \frac{2}{N(N+1)[P_{N}(x_n)]^2}, & x_n\neq \pm 1\\
  \frac{2}{N(N+1)}, & x_n = \pm 1.
  \end{cases}

Below are some values up to :math:`N+1=5` where :math:`r` is the maximum polynomial degree for which the quadrature is exact:

+-------------+--------------------------------+---------------------+-----------------+
| :math:`N+1` |	:math:`x_n`                    |:math:`\omega_n`     |:math:`r`        |
+=============+================================+=====================+=================+
| :math:`3`   |:math:`0`                       |:math:`\frac{4}{3}`  | :math:`3`       |
|             +--------------------------------+---------------------+-----------------+
|             |:math:`\pm 1`                   |:math:`\frac{1}{3}`  |                 |
+-------------+--------------------------------+---------------------+-----------------+
| :math:`4`   |:math:`\pm \sqrt{\frac{1}{5}}`  |:math:`\frac{5}{6}`  | :math:`5`       |
|             +--------------------------------+---------------------+-----------------+
|             |:math:`\pm 1`                   |:math:`\frac{1}{6}`  |                 |
+-------------+--------------------------------+---------------------+-----------------+
| :math:`5`   |:math:`0`                       |:math:`\frac{32}{45}`| :math:`7`       |
|             +--------------------------------+---------------------+-----------------+
|             |:math:`\pm\sqrt{\frac{3}{7}}`   |:math:`\frac{49}{90}`|                 |
|             +--------------------------------+---------------------+-----------------+
|             |:math:`\pm 1`                   |:math:`\frac{1}{10}` |                 |
+-------------+--------------------------------+---------------------+-----------------+


Basis of :math:`\Vhr`
---------------------

To construct the SEM basis :math:`(\Phi_{I})_{1\leq I \leq \dr}` of :math:`\Vhr`, where :math:`\dr` is the dimension of :math:`\Vhr`, we introduce the :math:`\loctoglob` function which computes the global numbering :math:`I` of a Degree of Freedom (DoF) from its local numbering :math:`\ib` in the element :math:`\Kp`.

.. math::

  \forall p=1,\ldots,\Nelem, \forall \ib\in\Ib, \exists!I \in \llbracket 1,\dr\rrbracket  \text{ such that } \loctoglob(p,\ib) = I.

The basis functions :math:`(\Phi_I)_I` of :math:`\Vhr` are now simply defined by

.. math:: 

  \forall I=1,\ldots,\dr, \forall p=1,\ldots,\Nelem, \quad \Phi_I\restrict_{\Kp} = \Phip_{\ib} \text{ with } I = \loctoglob(p,\ib).

Linear system
=============

Weak formulation in :math:`\Vhr`
--------------------------------

The unknown :math:`\uh` and the test function :math:`\vh` are expanded in this basis as :math:`\uh = \sum_I u_I\Phi_I` and :math:`\vh = \sum_I v_I\Phi_I`. The weak formulation :eq:`eq-wf-vhr` in :math:`\Vhr` can now be rewritten in the basis only

.. math::
  :label: eq-wf-full

  \left\{
    \begin{aligned}
      &\text{find } (u_J)_J \in\Rb^{\dr} \text{ such that} \\
      &\begin{alignedat}{1}
        \forall I = 1,\ldots, \dr, \quad&\sum_J u_J\int_{\Omega} k^2  \Phi_J(\xx) \Phi_I(\xx)\diff\xx + \sum_J u_J\int_{\Omega}  \nabla \Phi_J(\xx) \cdot \nabla \Phi_I(\xx)\diff\xx \\
        &-\sum_J \alpha u_J \int_{\partial\Omega} \Phi_J(\xx)\Phi_I(\xx) \diff\partial\Omega= \int_{\Omega}f(\xx)\Phi_I(\xx)\diff\xx + \int_{\partial\Omega} g(\xx)\Phi_I(\xx) \diff\partial\Omega ,
        \end{alignedat}
    \end{aligned}
  \right.

The mass :math:`\Mass` and stiffness matrices :math:`\Stiff` of :math:`\Rb^{\dr\times \dr}` are introduced and defined by

.. math:: 

  \forall I,J = 1,\ldots,\dr,\qquad \begin{cases}
    \displaystyle \Mass(I,J) = \int_{\Omega} \Phi_{J}(\xx) \Phi_{\ib}(\xx)\diff\xx \\
    \displaystyle \Stiff(I,J) = \int_{\Omega}\nabla \Phi_{J}(\xx) \cdot \nabla \Phi_{I}(\xx)\diff\xx.
  \end{cases}

We also construct the boundary mass matrix :math:`\dM\in \Rb^{\dr\times\dr}`

.. math::

  \forall I,J= 1,\ldots,\dr,\qquad \dM(I,J) = \int_{\partial\Omega} \Phi_J(\xx)\Phi_I(\xx) \diff\partial\Omega.

The right hand side are rewritten as vectors :math:`F = (F_I)_I` and :math:`G = (G_I)_I` with :math:`F_I = \sum_{p=1}^{\Nelem}\int_{\Kp}f(\xx)\Phip_{\ib}(\xx)\diff\xx` and :math:`G_I = \sum_{p=1}^{\Nelem}\int_{\partial Kp\cap\partial\Omega}g(\xx)\Phip_{\ib}(\xx)\diff\xx`. The coefficients of :math:`\uh` are gather in the vector :math:`U = (u_J)_J` and the equation :eq:`eq-wf-vhr` can then be rewritten as a linear system

.. math::

  \left\{
    \begin{aligned}
      &\text{find } U=(u_J)_J \in\Rb^{\dr} \text{ such that} \\
      &\begin{alignedat}{1}
      k^2MU + SU - \alpha\dM U = F +G.
      \end{alignedat}
    \end{aligned}
  \right.


.. _sec-sem-assembling:
Assembling the matrices
-----------------------


Building the matrices can be done in a smart way for finite element. A loop on the element, instead of the DoF, is done and for each hexahedron, small contributions are computed and added to the *big* matrix. This algorithm is faster as their are much less elements than dof and the computations can be still be achieved in parallel - with some obvious precaution when adding coefficients in the matrix.

As :math:`\Omega = \bigcup_p \Kp`, the integrals in :eq`eq-wf-full` can be split. Furthermore, on the element :math:`\Kp` and for any :math:`I= 1,\ldots, \dr`, we have :math:`\Phi_I\restrict_{\Kp} = \Phip_{\ib}` with :math:`I = \loctoglob(p,\ib)`, and thus

.. math::
  :label: eq-wf-vhr
  
  \left\{
    \begin{aligned}
      &\text{find } (u_J)_J \text{ in } \Rb^{\dr} \text{ such that} \\
      &\begin{alignedat}{1}
        \forall I = 1,\ldots, \dr, \quad&\sum_J  k^2 u_J \sum_{p=1}^{\Nelem} \int_{\Kp} \Phip_{\jb} \Phip_{\ib}\diff\Omega + \sum_J u_J\sum_{p=1}^{\Nelem}  \int_{\Kp}\nabla \Phip_{\jb} \cdot \nabla \Phip_{\ib}\diff\Omega\\
        & -\sum_J u_J \sum_{p=1}^{\Nelem} \int_{\partial\Omega} \Phip_{\jb}\Phip_{\ib} \diff\partial\Omega = \sum_{p=1}^{\Nelem}\int_{\Kp}f \Phip_{\ib}\diff\Omega - \sum_{p=1}^{\Nelem} \int_{\partial\Kp\mathrlap{\cap \partial\Omega}} g \Phip_{\ib} \diff\partial\Omega.
        \end{alignedat}
    \end{aligned}
  \right.

Introducing the elementary mass :math:`\Mp` and stiffness matrices :math:`\Sp` of :math:`\Rb^{(r+1)^3}` such that

.. math::
  
  \forall p, \forall \ib,\jb,\qquad \Mp(\ib,\jb) = \int_{\Kp} \Phip_{\jb}(\xx) \Phip_{\ib}(\xx)\diff\xx \quad\text{and}\quad
  \Sp(\ib,\jb) = \int_{\Kp}\nabla \Phip_{\jb}(\xx) \cdot \nabla \Phip_{\ib}(\xx).

We also introduce the boundary mass matrix :math:`\dMp\in \Rb^{(r+1)^3}` \todo{Dimension à revoir}

.. math::

  \forall p, \forall \ib,\jb,\qquad \dMp(\ib,\jb) = 
   \begin{cases}
    0 & \text{ if }\Kp\cap\partial\Omega = \emptyset\\
    \displaystyle\int\limits_{\partial\Kp \cap \partial\Omega} \Phip_{\jb}(\xx)\Phip_{\ib}(\xx)\diff\xx.
   \end{cases}

The assembling algorithm is then given by Algorithm \ref{alg-assembling}. Obviously, there is no need to store :math:`\Mass, \Stiff` and :math:`\dM`, they can be merged into one matrix :math:`A`.

.. 
  \begin{algorithm}
    \begin{algorithmic}
    \caption{Assembling algorithm}
    \label{alg-assembling}
    \State :math:`\Mass,\Stiff,\dM = 0`
    \For{:math:`p=1,\ldots, \Nelem`}
      \For{:math:`\ib`}
        \State :math:`I = \loctoglob(p,\ib)`
        \For{:math:`\jb`}
          \State :math:`J = \loctoglob(p,\jb)`
          \State :math:`\Mass(I,J) += \Mp(\ib,\jb)`
          \State :math:`\Stiff(I,J) += \Sp(\ib,\jb)`
          \State :math:`\dM(I,J) += \dM^p(\ib,\jb)`
        \EndFor
        \State :math:`F(I) += F^p(\ib)`
        \State :math:`G(I) += G^p(\ib)`
      \EndFor
    \EndFor
    \end{algorithmic}
  \end{algorithm}

Now, the coefficients of the elementary matrices must be computed.

.. _sec-sem-elem-mat:
Elementary matrices
===================

A diagonal mass matrix
----------------------

On the hexahedron :math:`\Kp`, the mass matrix :math:`\Mp\in \Rb^{(r+1)^3, (r+1)^3}` is defined by

.. math::

  \forall \ib,\jb\in\Ib, \qquad \Mp_{\ib,\jb} = \int_{\Kp}\Phi_{\jb}(\xxh)\Phi_{\ib}(\xxh)\diff\xxh.  

By a change of coordinate, the integral is rewritten in the reference hexahedron

.. math::
  :label: eq-mass-kp

  \forall \ib,\jb\in\Ib, \qquad \Mp_{\ib,\jb} = \int_{\Kh}\abs{\Jacp(\xxh)}\Phih_{\jb}(\xxh)\Phih_{\ib}(\xxh)\diff\xxh,

where :math:`\Jacp(\xxh)=\det(\jacp(\xxh))` is the determinant of the Jacobian matrix :math:`\jacp(\xxh)` of the transformation map :math:`\Fp` on point :math:`\xxh`:

.. math::

  \jacp(\xxh) =
  \begin{pmatrix}
    \frac{\partial x}{\partial \xh} & \frac{\partial x}{\partial \yh}& \frac{\partial x}{\partial \zh}\\
    \frac{\partial y}{\partial \xh} & \frac{\partial y}{\partial \yh}& \frac{\partial y}{\partial \zh}\\
    \frac{\partial z}{\partial \xh} & \frac{\partial z}{\partial \yh}& \frac{\partial z}{\partial \zh}
  \end{pmatrix}(\xxh).

Equation \eqref{eq-mass-kp} is expanded using the \gls{gauss-lobatto} rules with :math:`r+1` quadrature points for each integrals:

.. math::

  \begin{aligned}
    \forall \ib,\jb\in\Ib, \quad \Mp_{\ib,\jb} &= \int_{-1}^1\int_{-1}^1\int_{-1}^1 \abs{\Jacp(\xxh)}\mphih_{j_1}(\xh)\mphih_{i_1}(\xh)
    \mphih_{j_2}(\yh)\mphih_{i_2}(\yh)
    \mphih_{j_3}(\zh)\mphih_{i_3}(\zh)\diff\xh\diff\yh\diff\zh\\
    &\simeq \sum_{\ell=1}^{r+1}\left[\sum_{m=1}^{r+1}\left[\sum_{n=1}^{r+1}
    \abs{\Jacp(\xibh_{\ell,m,n})}
    \omega_{\ell}\mphih_{j_1}(\xih_{\ell})\mphih_{i_1}(\xih_{\ell})
      \omega_m\mphih_{j_2}(\xih_m)\mphih_{i_2}(\xih_m)
      \omega_n\mphih_{j_3}(\xih_n)\mphih_{i_3}(\xih_n)\right]\right]
  \end{aligned}

To simplify, we now get ride of the :math:`\simeq` symbol and :math:`\Mh_{\ib,\jb}` now refer to its approximation. We keep in mind that the mass matrix is \emph{not} the analytic one but a numerical approximation (but still accurate!). Using the property \eqref{eq-phi-delta} of the basis functions, we have

.. math::

  \Mp_{\ib,\jb} = \sum_{\ell=1}^{r+1}\left[\sum_{m=1}^{r+1}\left[\sum_{n=1}^{r+1}
  \abs{\Jacp(\xibh_{\ell,m,n})}
  \omega_{\ell}\omega_m
     \omega_n\underbrace{\delta_{j_1,\ell}\delta_{i_1,\ell}}_{j_1=i_1=\ell}\underbrace{\delta_{j_2, m}\delta_{i_2,m}}_{ j_2=i_2=m}\underbrace{\delta_{j_3, n}\delta_{i_3,n}}_{j_3=i_3=n}\right]\right].

In other words, the local mass matrix :math:`\Mp` is diagonal: 

.. math::
  
  \forall \ib,\jb \in \Ib,\qquad \Mp_{\ib,\jb} = 
  \begin{cases}
    \abs{\Jacp(\xibh_{\ib})}\omega_{i_1}\omega_{i_2}\omega_{i_3} & \text{if } \ib=\jb,\\
    0 & \text{otherwise}.
  \end{cases}


.. prf:remark::

  The Gauss-Lobatto quadrature rule with :math:`r+1` points is exact for polynomials of order :math:`2r-1`. Unfortunately, the polynomials :math:`\mphih_{i}` are or order :math:`r` and thus :math:`\mphih_{i}\mphih_{j}` of order :math:`2r`. The computation of the mass matrix is then approximated and not analytical. This is one drawback of the spectral element method but the approximation is still accurate as there is only "one degree difference".
