from Crypto.Util.number import long_to_bytes, bytes_to_long
import random

# Given values from the challenge
g = 3
p = 2**521-1
h = 22947283928394823423  # Replace with the actual h value
hint = 34209830924890324  # Replace with the actual hint value

# Helper functions from the original code
def log2Int(num):
    s = 0
    while num >= 1:
        num //= 2
        s += 1
    return s

def eightBitBlock(num):
    return '0'*(8-log2Int(num))+bin(num)[2::]

# Try all possible values for r (0 to 255)
for r in range(256):
    # Reconstruct secretNum for each r
    secretNum = int(eightBitBlock(r)*65, 2) * 2 + 1
    
    # XOR with hint to try to retrieve pow(m, 7, p)
    possible_pow_m7 = hint ^ secretNum
    
    # Now we need to reverse pow(m, 7, p) to find m, which is a discrete log problem.
    for m_guess in range(1, 100000):  # Adjust range based on expected size of m
        if pow(m_guess, 7, p) == possible_pow_m7:
            # If we find a match, we convert the integer back to bytes and print the flag
            flag = long_to_bytes(m_guess)
            print("Found potential flag:", flag.decode())
