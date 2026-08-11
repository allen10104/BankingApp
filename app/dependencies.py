from app.repositories.account_repository import AccountRepository
from app.repositories.transaction_repository import TransactionRepository
from app.repositories.customer_repository import CustomerRepository

from app.services.account_service import AccountService
from app.services.transaction_service import TransactionService
from app.services.customer_service import CustomerService


customer_repository = CustomerRepository()
account_repository = AccountRepository()
transaction_repository = TransactionRepository()


customer_service = CustomerService(
    customer_repository
)

account_service = AccountService(
    account_repository,
    customer_repository
)

transaction_service = TransactionService(
    account_repository,
    transaction_repository
)