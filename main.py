from bank import Bank
from customer import Customer
from checking_account import CheckingAccount
from savings_account import SavingsAccount


def main():

    bank = Bank("Bank")

    customer = Customer(
        1,
        "Allen",
        "allen",
        "123"
    )

    checking = CheckingAccount(101, 1000)
    savings = SavingsAccount(102, 5000)

    customer.add_account(checking)
    customer.add_account(savings)

    bank.add_customer(customer)

    print("Welcome to ", bank.getName())
    print("--------------------")

    username = input("Username: ")
    password = input("Password: ")

    logged_in_customer = None

    for customer in bank.get_customers():
        if customer.username == username and customer.password == password:
            logged_in_customer = customer
            break

    if logged_in_customer is None:
        print("Invalid username or password.")
        return

    print(f"\nWelcome, {logged_in_customer.get_name()}!")

    while True:

        print("\nCiti Menu")
        print("--------------------")
        print("1. View Accounts")
        print("2. Deposit")
        print("3. Withdraw")
        print("4. Logout")

        choice = input("Choose an option: ")

        if choice == "1":

            print("\nYour Accounts:")

            for account in logged_in_customer.get_accounts():
                print(account)

        elif choice == "2":

            account_id = int(input("Enter account number: "))
            amount = float(input("Enter deposit amount: $"))

            account_found = False

            for account in logged_in_customer.get_accounts():
                if account.get_id() == account_id:

                    account.deposit(amount)

                    print("Deposit successful.")
                    print(f"New balance: ${account.get_balance():.2f}")

                    account_found = True
                    break

            if account_found == False:
                print("Account not found.")

        elif choice == "3":

            account_id = int(input("Enter account number: "))
            amount = float(input("Enter withdrawal amount: $"))

            account_found = False

            for account in logged_in_customer.get_accounts():
                if account.get_id() == account_id:

                    success = account.withdraw(amount)

                    if success:
                        print("Withdrawal successful.")
                        print(f"New balance: ${account.get_balance():.2f}")
                    else:
                        print("Unable to withdraw that amount.")

                    account_found = True
                    break

            if account_found == False:
                print("Account not found.")

        elif choice == "4":

            print("Thank you for banking with Citi.")
            break

        else:
            print("Invalid option.")


if __name__ == "__main__":
    main()