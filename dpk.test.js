const { deterministicPartitionKey } = require('./dpk');

describe('deterministicPartitionKey', () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe('0');
  });

  it('Returns the input partition key when given a valid partition key that is a string and under 257 characters', () => {
    const event = {
      partitionKey: 'valid',
    };
    const validKey = deterministicPartitionKey(event);
    expect(validKey).toBe('valid');
  });

  it('Generates a new partition key when given an invalid partition key with more than 256 characters', () => {
    const event = {
      partitionKey: 'a'.repeat(257),
    };
    const invalidKey = deterministicPartitionKey(event);
    expect(invalidKey).not.toBe('a'.repeat(257));
  });

  it('Generates a new partition key when given an invalid partition key with a non-string type', () => {
    const event = {
      partitionKey: 123,
    };
    const invalidKey = deterministicPartitionKey(event);
    expect(invalidKey).not.toBe(123);
  });

  it('generates a new partition key when not given a partition key', () => {
    const event = {
      data: 'some-data',
    };
    const key = deterministicPartitionKey(event);
    expect(key).not.toBe(JSON.stringify(event));
  });

  it('generates the same partition key for the same input', () => {
    const event = {
      data: 'some-data',
    };
    const key1 = deterministicPartitionKey(event);
    const key2 = deterministicPartitionKey(event);
    expect(key1).toBe(key2);
  });
});
