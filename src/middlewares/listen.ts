import colors from 'colors/safe'

import globals from '../config/globals'

const runningEnvironmentText =
globals.NAME === 'production'
    ? colors.red(globals.NAME)
    : colors.blue(globals.NAME)

export default () =>
  console.log(
    colors.green(
      `[SERVER] Listening on port ${colors.blue(
        globals.PORT
      )} (${runningEnvironmentText})`
    )
  )
