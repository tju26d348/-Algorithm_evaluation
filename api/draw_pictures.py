import matplotlib.pyplot as plt
import matplotlib as mpl
import random

mpl.rcParams['font.sans-serif'] = ['SimHei'] #指定默认字体 SimHei为黑体
mpl.rcParams['axes.unicode_minus'] = False


def random_color():
    color_arr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']
    color = ""
    for i in range(6):
        color += color_arr[random.randint(0, 14)]
    return "#"+color


def drawing_pictures(precision_dict, recall_dict, path_of_fig):
    plt.xlabel('Recall')
    plt.ylabel('Precision')
    plt.axis([0, 1, 0, 1])
    for key in precision_dict.keys():
        for method in precision_dict[key].keys():
            plt.plot(precision_dict[key][method], recall_dict[key][method], color=random_color(), label='test' + str(method))
    plt.legend()
    plt.savefig(path_of_fig)
    # plt.show()
    plt.clf()


def save_precision_and_recall(precision, recall):
    str_precision = ",".join('%s' %id for id in precision)
    str_recall = ",".join('%s' %id for id in recall)
    print("[str_precision] = ", str_precision, "\n[str_recall] =", str_recall)
    return str_precision, str_recall


def read_precision_and_recall(str_precision, str_recall):
    precision = [float(x) for x in str_precision.split(",")]
    recall = [float(x) for x in str_recall.split(",")]
    return precision, recall
