import os
from dotenv import load_dotenv

load_dotenv()  # مهم جداً

def two_factor_authentication():
    import random
    digits = [str(random.randint(0, 9)) for _ in range(4)]
    return "".join(digits)

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

email = os.getenv("EMAIL")
pass_key = os.getenv("EMAIL_PASS_KEY")
resev_email = "yaaaser228@gmail.com"

subject = "2FA"
body = two_factor_authentication()

msg = MIMEMultipart()
msg['From'] = email
msg["To"] = resev_email
msg['Subject'] = subject
msg.attach(MIMEText(body, 'plain'))

try:
    with smtplib.SMTP('smtp.gmail.com', 587) as server:
        server.starttls()
        server.login(email, pass_key)
        server.sendmail(email, resev_email, msg.as_string())
        print("email sent successfully")

except Exception as e:
    print("ERROR:", e)
