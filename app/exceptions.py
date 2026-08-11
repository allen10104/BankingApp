class CustomerNotFoundError(Exception):
    pass


class AccountNotFoundError(Exception):
    pass


class InvalidTransferError(Exception):
    pass


class InsufficientFundsError(Exception):
    pass