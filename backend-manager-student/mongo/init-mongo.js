const db = db.getSiblingDB('library_school_service');
const user = db.getUser('docker');
if (!db && !user) {
  db.createUser({
    user: 'docker',
    pwd: 'docker',
    roles: [{ role: 'readWrite', db: 'library_school_service' }],
  });
}
