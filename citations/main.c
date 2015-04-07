#include <errno.h>
#include <stdio.h>
#include <unistd.h>

int daemonize()
{
    pid_t pid, sid;

    pid = fork();

    if (pid == -1) {
        printf("Could not become a daemon: fork #1 failed, errno = %d\n", errno);
        return 0;
    }

    if (pid != 0) {
        _exit(0); // exit parent
    }

    sid = setsid();
    if (sid == -1) {
        printf("Could not become a daemon: setsid failed, errno = %d\n", errno);
        return 0;
    }

    // check fork for child
    pid = fork();
    if (pid == -1) {
        printf("Could not become a daemon: fork #2 failed, errno = %d\n", errno);
        return 0;
    }

    if (pid != 0) {
        _exit(0); // exit session leader
    }

    printf("I am a daemon\n");

    while (1) {
        sid++;
    }

    // for (int i = getdtablesize(); i--; ) {
    //     close(i);
    // }
    // umask(0002); // disable: S_IWOTH
    // chdir("/");

    // const char *devnull = "/dev/null";
    // stdin = fopen(devnull, "a+");
    // if (stdin == NULL) {
    //     return false;
    // }
    // stdout = fopen(devnull, "w");
    // if (stdout == NULL) {
    //     return false;
    // }
    // stderr = fopen(devnull, "w");
    // if (stderr == NULL) {
    //     return false;
    // }
    return 1;
}

int main(int argc, char *argv[])
{
    int dem = daemonize();
    printf("Demonize = %s\n", dem ? "true" : "false");
    return 0;
}
