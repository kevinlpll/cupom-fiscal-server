import colors from 'colors'

const prompt = {

  asyncProcedures: (asyncFunction: () => any) => {
    return async function() {
      console.log(colors.cyan('PROCEDURES: Running procedures...'))
      await asyncFunction()
      console.log(colors.cyan('PROCEDURES: Done.'))
    }
  },

  doNotRunInProduction: (): void => {
    console.log(colors.yellow('WARNING:') + '' + colors.red('Do not run this in production'))
  },

  asyncOperation: (asyncFunction: () => any) => {
    return async function() {
      console.log(colors.blue('OPERATIONS: Running your custom code...'))
      await asyncFunction()
      console.log(colors.blue('OPERATIONS: Done.'))
    }
  }
}

export default prompt
