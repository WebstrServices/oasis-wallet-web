import { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from 'utils/@reduxjs/toolkit'
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors'
import { AccountsRow, OperationsRow } from 'vendors/explorer'
import { accountSaga } from './saga'
import { AccountState } from './types'

export const initialState: AccountState = {
  address: '',
  debonding_balance: 0,
  escrow_balance: 0,
  liquid_balance: 0,
  accountError: null,
  transactions: [],
  transactionsError: null,
  loading: true,
}

const slice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    clearAccount(state, action: PayloadAction<void>) {
      Object.assign(state, initialState)
    },
    fetchAccount(state, action: PayloadAction<string>) {},
    accountLoaded(state, action: PayloadAction<AccountsRow>) {
      state.accountError = null
      Object.assign(state, action.payload)
    },
    accountError(state, action: PayloadAction<string>) {
      state.accountError = action.payload
    },
    transactionsLoaded(state, action: PayloadAction<OperationsRow[]>) {
      state.transactionsError = null
      state.transactions = action.payload
    },
    transactionsError(state, action: PayloadAction<string>) {
      state.transactionsError = action.payload
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },
  },
})

export const { actions: accountActions } = slice

export const useAccountSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer })
  useInjectSaga({ key: slice.name, saga: accountSaga })
  return { actions: slice.actions }
}
