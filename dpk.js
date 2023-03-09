const crypto = require('crypto');

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = '0';
  const MAX_PARTITION_KEY_LENGTH = 256;

  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  // If there is an event partition key, and it is valid, return it
  const isValidEventKey = checkIsEventKeyValid(event, MAX_PARTITION_KEY_LENGTH);

  if (event.partitionKey && isValidEventKey) {
    return event.partitionKey;
  }

  let newKey;

  // If there is an event partition key, but it is invalid, we need to generate a valid key from
  // the current event partition key
  if (event.partitionKey && !isValidEventKey) {
    newKey = event.partitionKey;
  }

  if (typeof newKey !== 'string') {
    newKey = JSON.stringify(newKey);
  }

  if (newKey && newKey.length > MAX_PARTITION_KEY_LENGTH) {
    return crypto.createHash('sha3-512').update(newKey).digest('hex');
  }

  // If there is no event partition key, we need to generate a valid key from the event
  return newPartitionKey(event, MAX_PARTITION_KEY_LENGTH);
};

function checkIsEventKeyValid(event, maxPartitionKeyLength) {
  if (!event.partitionKey) {
    return false;
  }
  const isPartitionKeyString = typeof event.partitionKey === 'string';

  const isPartitionKeyLengthValid =
    event.partitionKey.length < maxPartitionKeyLength;

  return isPartitionKeyString && isPartitionKeyLengthValid;
}

function newPartitionKey(event, maxPartitionKeyLength) {
  const data = JSON.stringify(event);

  const newKey = crypto.createHash('sha3-512').update(data).digest('hex');

  if (typeof newKey !== 'string') {
    newKey = JSON.stringify(newKey);
  }

  if (newKey.length > maxPartitionKeyLength) {
    return crypto.createHash('sha3-512').update(newKey).digest('hex');
  }

  return newKey;
}
