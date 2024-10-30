# Ayudantes y Colecciones

We’ve already covered many global functions throughout the book: these are little
helpers that make it easier to perform common tasks, like dispatch() for jobs,
event() for events, and app() for dependency resolution. We also talked a bit about Laravel’s collections, or arrays on steroids, in [Database and Eloquent](../databases-and-eloquent/configuration.html).

In this chapter we’ll cover some of the more common and powerful helpers and some
of the basics of programming with collections. Many of the “helpers” in this section
that once were global functions are now calls on facades; array_first(), the global
function, has been replaced by Arr::first(), the auth call. So while these aren’t all
technically helpers, as they’re not all global functions anymore, they still have the
same position in our toolbox.

## Ayudantes

