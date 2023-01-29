source ../.env
while true; do
    # Date
    date=`date +%Y%m%d_%H%M%S`
    # Backup Data
    echo "Backing up data..."
    redis-cli -h $REDIS_HOST -a $REDIS_PASSWORD -p $REDIS_PORT BGSAVE
    # Logs time date backup
    sh -c "echo $(date) >> /usr/local/bin/scrip/log_scrip_redis_date.txt"
    # release data redis show byte done
    echo "Released $(redis-cli -h $REDIS_HOST -a $REDIS_PASSWORD -p $REDIS_PORT  MEMORY RELEASE $MEMORY_RELEASE_MAX --statistics | grep -oE "[0-9]+") bytes of memory" --- DONE
    # Get all key
    keys=`redis-cli -h $REDIS_HOST -a $REDIS_PASSWORD -p $REDIS_PORT keys "*"`
    # Time last backup
    timelastbackup=`redis-cli -h $REDIS_HOST -a $REDIS_PASSWORD -p $REDIS_PORT  LASTSAVE`
    # Show Time last backup and date 
    echo $timelastbackup - $date    
    for key in $keys
    do
        echo $key
    done
    # 5 minutes
    sleep 300
done
