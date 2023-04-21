warning: under (heavy) construction! 

# Maillage et Éléments Finis

## Requierement

This lecture note (in french, sorry), has been created using Python Sphinx Documentation, the [Sphinx-book theme](https://github.com/executablebooks/sphinx-book-theme) and the following plugins

* [sphinx-proof](https://github.com/executablebooks/sphinx-proof)
* [sphinx-exercise](https://github.com/executablebooks/sphinx-exercise)
* [sphinx-togglebutton](https://github.com/executablebooks/sphinx-togglebutton)

You need to install all of them to make it work

```bash
pip install -U sphinx
pip install sphinx-book-theme
pip install sphinx-exercise sphinx-proof sphinx-togglebutton
```

And then compile type `make html` (or `make dirhmlt`) to build the html folder in `_build/html` (or in `_build/dirhtml`) and/or `make latex` and `make latexpdf` to build the pdf of the lecture note.

A `.gitlab-ci.yml` file is also available to use it with Gitlab Page.