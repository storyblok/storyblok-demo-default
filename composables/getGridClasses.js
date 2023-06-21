export default function (cols) {
  let gridClasses =
    'grid md:grid-cols-2 gap-10 md:gap-12 md:mt-12 place-items-center items-start'

  switch (cols) {
    case '4':
      gridClasses += ' lg:grid-cols-3 xl:grid-cols-4'
      break
    case '3':
      gridClasses += ' lg:grid-cols-3'
      break
  }

  return gridClasses
}
