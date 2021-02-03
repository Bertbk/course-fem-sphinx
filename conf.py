# Configuration file for the Sphinx documentation builder.
#
# This file only contains a selection of the most common options. For a full
# list see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Path setup --------------------------------------------------------------

# If extensions (or modules to document with autodoc) are in another directory,
# add these directories to sys.path here. If the directory is relative to the
# documentation root, use os.path.abspath to make it absolute, like shown here.
#
# import os
# import sys
# sys.path.insert(0, os.path.abspath('.'))

# import sphinx_rtd_theme


# -- Project information -----------------------------------------------------

project = 'Maillage et Éléments Finis'
copyright = '2020, Bertrand Thierry'
author = 'Bertrand Thierry'


# -- General configuration ---------------------------------------------------

# Add any Sphinx extension module names here, as strings. They can be
# extensions coming with Sphinx (named 'sphinx.ext.*') or your custom
# ones.

extensions = [
    "sphinxcontrib.proof",
]

# Add any paths that contain templates here, relative to this directory.
templates_path = ['_templates']

# The language for content autogenerated by Sphinx. Refer to documentation
# for a list of supported languages.
#
# This is also used if you do content translation via gettext catalogs.
# Usually you set "language" from the command line for these cases.
language = 'fr'

# List of patterns, relative to source directory, that match files and
# directories to ignore when looking for source files.
# This pattern also affects html_static_path and html_extra_path.
exclude_patterns = []

numfig = True

# -- Options for HTML output -------------------------------------------------

# The theme to use for HTML and HTML Help pages.  See the documentation for
# a list of builtin themes.
#

html_theme = "furo"

html_title = "Maillage et Éléments Finis"

proof_theorem_types = {
   "algorithm": "Algorithm",
   "conjecture": "Conjecture",
   "corollary": "Corollary",
   "definition": "Definition",
   "example": "Example",
   "lemma": "Lemma",
   "observation": "Observation",
   "proof": "Proof",
   "property": "Property",
   "theorem": "Theorem",
   "remark":"Remarque",
   "proposition":"Proposition",
   "exercise":"Exercice",
}
proof_latex_notheorem = ["proof"]
#proof_html_nonumbers = ["exercise"]




# Add any paths that contain custom static files (such as style sheets) here,
# relative to this directory. They are copied after the builtin static files,
# so a file named "default.css" will overwrite the builtin "default.css".
html_static_path = ['_static']


html_css_files = [
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css',
    'css/proof.css',
]

html_js_files = [
    'js/proof.js',
    'https://d3js.org/d3.v5.min.js',
    'https://d3js.org/d3-scale-chromatic.v1.min.js',
    'js/basis-function/main.js',
    'js/jacobian/main.js',
    'js/loc2glob/main.js',
    'https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js',
]

# Additional stuff for the LaTeX preamble.
latex_engine = 'lualatex'
latex_elements = {}
latex_elements['preamble'] = '\usepackage{amsmath}\n\usepackage{amssymb}\n\usepackage{amsthm}\n'
latex_elements['babel'] = '\\usepackage{babel}'
latex_additional_files = ['mystyle.sty', 'img/normal/normal.tex']
latex_elements['extrapackages'] = '\usepackage{tikz}\n\usetikzlibrary{arrows, calc, fit}\n\usepackage{standalone}\n\usepackage{mathrsfs}\n\usepackage{mystyle}'
latex_toplevel_sectioning = "part"


# copy to mathjax
mathjax_config = {                  
    "TeX": {                        
        "Macros": {
            'dsp' : '{\\displaystyle}',
            'gD': '{g_D}',
            'gN': '{g_N}',
            'GammaN': '{\\Gamma_N}',
            'GammaD': '{\\Gamma_D}',
            'GammaF':'\Gamma_F',
            'Lo':'{L^2(\\Omega)}',
            'Ho':'{H^1(\\Omega)}',
            'Hoz':'{H^1_{0}(\\Omega)}',
            'HoD':'{H^1_{\\GammaD}(\\Omega)}',
            'Hog':'{H^1_{\\gD}(\\Omega)}',
            'Hoo':'{H^2(\\Omega)}',
            'Vh': '{V_h}',
            'Vhz': '{V_{h,0}}',
            'VhD': '{V_{h,\GammaD}}',
            'abs': ['{\\left|#1\\right|}',1],
            'norm': ['{\\left\\|#1\\right\\|}',1],
            'PS': ['{\\left(#1,#2\\right)}',2],
            'PSL': ['{\\PS{#1}{#2}_{\Lo}}',2],
            'PSLd': ['{\\PS{#1}{#2}_{\Lo^d}}',2],
            'PSH': ['{\\PS{#1}{#2}_{\Ho}}',2],
            'PSV': ['{\\PS{#1}{#2}_{V}}',2],
            'normL': ['{\\norm{#1}_{\Lo}}',1],
            'normLd': ['{\\norm{#1}_{(\Lo)^d}}',1],
            'normH': ['{\\norm{#1}_{\Ho}}',1],
            'normV': ['{\\norm{#1}_{V}}',1],
            'ut': '{u_t}',
            'uh': '{u_h}',
            'vh': '{v_h}',
            'Ahh': '{A}',
            'Bh': '{B}',
            'Uh': '{U}',
            'Rb': '{\\mathbb{R}}',
            'Nb': '{\\mathbb{N}}',
            'nn': '{\\mathbf{n}}',
            'dn': '{\\partial_{\\nn}}',
            'ee': '{\\mathbf{e}}',
            'xx': '{\\mathbf{x}}',
            'yy': '{\\mathbf{y}}',
            'zz': '{\\mathbf{z}}',
            'diff': '{\\mathrm{d}}',
            'Cscr': '{\\mathscr{C}}',
            'Ccal': '{\\mathcal{C}}',
            'mphi': '{\\varphi}',
            'mphih': '{\\widehat{\\varphi}}',
            'psih': '{\\widehat{\\psi}}',
            'gh': '{\\widehat{g}}',
            'deltaij': '{\\delta_{ij}}',
            'tri': '{K}',
            'trih': '{\\widehat{K}}',
            'vertice': '{\\mathbf{s}}',
            'verticeK': ['{\\vertice^{#1}}', 1],
            'verticeh': '{\\widehat{\\vertice}}',
            'grandO': ['{O\\left(#1\\right)}', 1],
            'Nh':'{N_h}',
            'Ns':'{N_s}',
            'Nt':'{N_t}',
            'Pb':'{\mathbb{P}}',
            'Sh':'{\mathscr{S}_h}',
            'Th':'{\mathscr{T}_h}',
            'Ah':'{\mathscr{A}_h}',
            'card':'{\\textrm{card}}',
            'supp': '{\\textrm{supp}}',
            'diam': '{\\textrm{diam}}',
            'Image': '{\\textrm{Im}}',
            'locToGlob':'{\\texttt{L2G}}',
            'trihToTri':['{T_{#1}}',1],
            'JK':['{J_{#1}}',1],
            'BK':['{B_{#1}}',1],
            'Meh':'{\\widehat{M}^e}', 
            'Deh':'{\\widehat{D}^e}', 
            'Me':['{M^e_{#1}}', 1], 
            'De':['{D^e_{#1}}', 1], 
            'enstq':['{\\left\\{#1 \\mathrel{}\\middle|\\mathrel{}#2\\right\\}}',2]
            }
        }   
    }
