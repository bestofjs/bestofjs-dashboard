import vagueTime from 'vague-time'

/*
Function equivalent to moment(<stringDate>).fromNow()
*/
export default function(strDate) {
  try {
    return vagueTime.get({
      to: new Date(strDate)
    })
  } catch (e) {
    // avoid throwing "Invalid date" errors
    return '?'
  }
}