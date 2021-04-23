export default function (context) {
  if (process.env.NODE_ENV !== 'development' && document.location.protocol == 'http:') {
    document.location.href = document.location.href.replace('http:', 'https:')
  }
}


